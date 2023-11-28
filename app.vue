<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'

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
</script>

<template>
  <ElConfigProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
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
