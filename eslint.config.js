// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  // @ts-expect-error types are not compatible yet
  antfu(
    {
      unocss: true,
      formatters: true,
    },
  ),
)
