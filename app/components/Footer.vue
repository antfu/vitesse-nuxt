<script setup lang="ts">
import { NuxtLink } from '#components'
import DarkToggle from '~/components/DarkToggle.vue'
</script>

<template>
  <div text="xl gray4" m-5 flex="~ gap3" justify-center>
    <NuxtLink i-carbon-campsite to="/" />
    <a i-carbon-logo-github href="https://github.com/antfu/vitesse-nuxt3" target="_blank" />
    <DarkToggle />
  </div>
</template>
