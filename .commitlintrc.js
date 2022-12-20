module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) => message.startsWith('Merge ') || message.startsWith('WIP: '),
  ],
  rules: {
    'type-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'WIP',
        'setup',
        'build',
        'docker',
        'k8s',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
}
