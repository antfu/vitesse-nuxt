import config from '@daotl/eslint-config'
import unocss from '@unocss/eslint-plugin'

// export default [
//   {
//     ignores: ['.output', '.nuxt', 'plugins/__*.ts', 'docker', 'k8s', 'generated', 'node-jiti', 'dist'],
//   },
//   ...config(),
//   unocss.configs.flat,
// ]

export default config({
  ignores: ['.output', '.nuxt', 'plugins/__*.ts', 'docker', 'k8s', 'generated', 'node-jiti', 'dist'],
}, unocss.configs.flat)
