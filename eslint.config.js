// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  // @ts-expect-error
  antfu(
    {
      unocss: true,
      formatters: true,
    },
  )
)
