import { config, namespace } from './common'
import { init } from './resource'

const appName = 'nuxt-starter'

const args = {
  appName,
  appLabels: { app: appName },
  imageName: 'harbor.daot.io/web/nuxt-starter',
  imageTag: process.env['IMAGE_TAG'] || config.get('imageTag') || 'main',
  hostname: 'nuxt-starter.demo.daot.io',
}

// When "done", this will print the service IP.
export const { deploymentName, serviceIp } = init(namespace).stack(args)
