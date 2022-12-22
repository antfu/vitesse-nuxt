nodeImage = "daotl/node-gyp:9.0.0-node-19-root-git-pnpm-turborepo-alpine"
alpineVersion = "v3.17"
targetBranches = ["main"]
# owners = ["nex"]

cmdReplaceAlpineRepo = "echo 'https://mirror.tuna.tsinghua.edu.cn/alpine/%s/main/' > /etc/apk/repositories" % alpineVersion

def main(ctx):
    conf = [pipeline(ctx)]
    conf.extend(secrets())
    return conf

def pipeline(ctx):
    return {
        "kind": "pipeline",
        "name": "default",
        "type": "kubernetes",
        "trigger": {
            "branch": {"exclude": ["temp/*"]},
            # `custom` for triggering builds from UI
            "event": ["custom", "push", "tag"],
        },
        "metadata": {
            "annotations": {"drone.daot.io/repo": ctx.repo.slug},
        },
        "clone": {"disable": True},
        "steps": steps(ctx),
        # Speed up using K8s internal network
        "host_aliases": [{
            # ClusterIP of K8s Traefik ingress controller
            "ip": "192.168.0.1",
            "hostnames": [
                "npm.daot.io",
                "harbor.daot.io",
            ],
        }],
        "volumes": [{
            "name": "build-env-data",
            "claim": {
                "name": "build-env-data",
                "read_only": False,
            },
        }],
    }

def steps(ctx):
    # dockerRepo = "harbor.daot.io/web/nuxt-starter"
    # dockerTagCommit = "commit-" + ctx.build.commit[0:8]
    # dockerTagBranch = ctx.build.commit.replace("/", "-")

    cacheVolume = {
        "name": "build-env-data",
        "path": "/env",
    }

    # Retry `pnpm i` at most 3 times for possible network timeout
    cmdPnpmInstallRetry3 = "for i in $(seq 1 3); do [ $i -gt 1 ] && sleep 15; pnpm i && s=0 && break || s=$?; done; (exit $s)"

    return [{
        "name": "clone",
        "image": "alpine/git",
        "environment": {
            "SSH_KEY": {"from_secret": "giteaSshPrivKey"},
        },
        "commands": [
            "mkdir ~/.ssh",
            "echo $SSH_KEY > ~/.ssh/id_ed25519",
            r"sed -i 's/\\\\n/\\n/g' ~/.ssh/id_ed25519",
            "chmod 600 ~/.ssh/id_ed25519",
            "echo 'Host gitea.daot.io\n  Hostname gitea-ssh.gitea\n' >> ~/.ssh/config",
            "ssh-keyscan -H gitea-ssh.gitea >> ~/.ssh/known_hosts",
            "git clone %s ." % ctx.repo.git_ssh_url,
            "git checkout $DRONE_COMMIT",
            "git submodule update --init --recursive",
        ],
    }, {
        "name": "install",
        "image": nodeImage,
        "volumes": [cacheVolume],
        "environment": {
            # "CYPRESS_INSTALL_BINARY": "0",
            "PULUMI_HOME": "/env/cache/.pulumi",
        },
        "commands": [
            "npm config set tarball /env/cache/nodejs/node-v19.3.0-headers.tar.gz",
            # Set credentials for `npm.daot.io`
            "echo $NPMRC > ~/.npmrc",
            r"sed -i 's/\\\\n/\\n/g' ~/.npmrc",
            # Read and store downloaded packages from cache volume
            "pnpm config set store-dir /env/cache/.pnpm-store",
            # Install deps
            cmdPnpmInstallRetry3,
        ],
    }, {
        "name": "build",
        "image": nodeImage,
        "environment": {
            "NODE_OPTIONS": "--max-old-space-size=8192",
        },
        "commands": ["pnpm build"],
    }, {
        "name": "lint",
        "image": nodeImage,
        "environment": {
            "NODE_OPTIONS": "--max-old-space-size=8192",
        },
        "commands": ["pnpm lint"],
        # }, {
        #     "name": "docker",
        #     "image": "plugins/docker",
        #     "when": {
        #         "branch": targetBranches,
        #     },
        #     "settings": {
        #         "repo": dockerRepo,
        #         "tags": "$DRONE_TAG" if ctx.build.event == "tag" else [
        #             dockerTagCommit,
        #             dockerTagBranch,
        #         ],
        #         "dockerfile": "docker/Dockerfile.prebuilt",
        #         "build_args": ["BUILD_ENV=dev"],
        #         "cache_from": ["%s:%s" % (dockerRepo, dockerTagBranch)],
        #         "registry": "harbor.daot.io",
        #         "username": {"from_secret": "droneHarborUsername"},
        #         "password": {"from_secret": "droneHarborPassword"},
        #         "mirror": {"from_secret": "aliyunDockerHubMirror"},
        #         # "auto_tag": true,
        #         # "auto_tag_suffix": "linux-amd64",
        #     },
        # }, {
        #     "name": "deploy-demo",
        #     "image": "pulumi/pulumi-nodejs:3.47.0",
        #     "when": {
        #         "branch": targetBranches,
        #     },
        #     "volumes": [cacheVolume],
        #     "environment": {
        #         "NUXT_STARTER_IMAGE_TAG": dockerTagCommit,
        #         "PULUMI_HOME": "/env/cache/.pulumi",
        #         "PULUMI_ACCESS_TOKEN": {"from_secret": "pulumiAccessToken"},
        #     },
        #    "commands": [
        #        "pulumi up --cwd k8s -s dev --cwd k8s --non-interactive --skip-preview --yes",
        #    ],
    }, {
        "name": "notify",
        "image": "plugins/slack",
        "when": {
            "status": [
                # "success",
                "failure",
            ],
        },
        # "environment": {"WEBHOOK": {"from_secret": "zulipWebhook"}},
        "settings": {
            "webhook": {"from_secret": "zulipWebhook"},
            "channel": "Drone",  # Will become Zulip topic
            "template": notifyZulipTmpl(ctx),
        },
    }]

def notifyZulipTmpl(ctx):
    author = ctx.build.author_name if ctx.build.author_name else ctx.build.sender
    tmplBuildLink = "<{{build.link}}|{{repo.owner}}/{{repo.name}}#{{build.number}}>"
    tmplPr = "{{#if build.pull}}<%s/pulls/{{build.pull}}|PR#{{build.pull}}>, {{/if}}" % ctx.repo.link
    tmplCommitBranchAuthor = "commit <%s/commit/{{build.commit}}|#{{truncate build.commit 8}}> on branch <%s/src/branch/{{build.branch}}|{{build.branch}}> by %s" % (ctx.repo.link, ctx.repo.link, author)
    # tmplMentions = ""
    # for o in owners:
    #     tmplMentions += "@*%s* " % o

    # {{#success build.status}} is not reliable, sometimes build fails but evaluates to `true`
    #     tmpl = """
    #         {{#success build.status}}
    #         :check: *Success:* build %s
    # %s%s
    #         {{else}}
    #         {{/success}}
    # Currently only notify when build fails
    tmpl = """
        :cross_mark: *Failure:* build %s *Please fix soon!* @*%s*
%s%s
    """ % (
        # success
        # tmplBuildLink,
        # tmplPr,
        # tmplCommitBranchAuthor,
        # failure
        tmplBuildLink,
        author,
        tmplPr,
        tmplCommitBranchAuthor,
    )
    return tmpl

def secrets():
    return [{
        "kind": "secret",
        "name": "giteaSshPrivKey",
        "get": {
            "path": "global-env",
            "name": "giteaSshPrivKey",
        },
    }, {
        "kind": "secret",
        "name": "npmrc",
        "get": {
            "path": "global-env",
            "name": "npmrc",
        },
        # }, {
        #     "kind": "secret",
        #     "name": "droneHarborUsername",
        #     "get": {
        #         "path": "global-env",
        #         "name": "droneHarborUsername",
        #     },
        # }, {
        #     "kind": "secret",
        #     "name": "droneHarborPassword",
        #     "get": {
        #         "path": "global-env",
        #         "name": "droneHarborPassword",
        #     },
        # }, {
        #     "kind": "secret",
        #     "name": "aliyunDockerHubMirror",
        #     "get": {
        #         "path": "global-env",
        #         "name": "aliyunDockerHubMirror",
        #     },
        # }, {
        #     "kind": "secret",
        #     "name": "pulumiAccessToken",
        #     "get": {
        #         "path": "global-env",
        #         "name": "pulumiAccessToken",
        #     },
    }, {
        "kind": "secret",
        "name": "zulipWebhook",
        "get": {
            "path": "global-env",
            "name": "zulipWebhookWeb",
        },
    }]
