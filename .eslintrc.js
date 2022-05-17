module.exports = {
  root: true,
  extends: '@daotl/vue/typescript',
  overrides: [
    {
      files: '*.{ts,tsx,vue}',
      excludedFiles: ['*.mdx', '**/*.md/*.ts'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
}
