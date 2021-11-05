<script setup lang="ts">
const route = useRoute()

const name = route.params.id
</script>

<template>
  <div>
    <div i-twemoji:waving-hand text-4xl inline-block animate-bounce></div>
    <h3 text-2xl>
      Hi!
    </h3>
    <div>{{ name }}</div>

    <div>
      <NuxtLink
        class="btn m-3 text-sm mt-6"
        to="/"
      >
        Back
      </NuxtLink>
    </div>

    <Counter />
  </div>
</template>
