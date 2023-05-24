<script setup lang="ts">
const title = useAppConfig().title
</script>

<template>
  <div inline-flex cursor-default text-2xl font-300>
    <div flex flex-col children:mx-auto>
      <img w-18 h-18 inline-block src="../assets/images/nuxt.png" />
      <span text-green5 mt--2>Nuxt 3</span>
    </div>
    <div
      text="3xl gray4"
      m="x-4 y-auto"
      i-carbon-add
      transform
      transition-all-500
      hover:rotate-135
    />
    <div flex flex-col children:mx-auto>
      <img w-18 h-18 inline-block src="/vite.png" />
      <span text-purple5 mt--2>{{ title }}</span>
    </div>
  </div>
</template>
