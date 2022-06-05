<script setup lang="ts">
import 'element-plus/theme-chalk/src/button.scss'

import { ElButton } from 'element-plus'

const { setLocale, locale } = useLocal()
</script>

<template>
  <div text="xl gray4" m-5 flex justify-center gap-3>
    <NuxtLink i-carbon-campsite to="/" />
    <a
      i-carbon-logo-github
      href="https://github.com/antfu/vitesse-nuxt3"
      target="_blank"
    />
    <DarkToggle />
    <el-button @click="setLocale(locale === 'en' ? 'zhCn' : 'en')">
      en / zh-CN
    </el-button>
  </div>
</template>
