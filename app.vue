<script setup lang="ts">
import { ElConfigProvider, ID_INJECTION_KEY } from 'element-plus'

useHead({
  title: 'Vitesse Nuxt 3',
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/nuxt.png',
    },
  ],
})

// Element Plus needs Injecting ID for SSR
// See: https://github.com/element-plus/element-plus/issues/7963
provide(ID_INJECTION_KEY, {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
})

const { setPreferredLanguage } = useLocale()
setPreferredLanguage()
</script>

<template>
  <el-config-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<style lang="scss">
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
