<script setup lang="ts">
const route = useRoute()

const name = route.params.id
</script>

<template>
  <div>
    <div i-twemoji:waving-hand text-4xl inline-block animate-bounce></div>
    <h3 text-2xl font-500>
      Hi,
    </h3>
    <div text-xl>
      {{ name }}!
    </div>

    <Counter />

    <div>
      <NuxtLink
        class="btn m-3 text-sm"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
