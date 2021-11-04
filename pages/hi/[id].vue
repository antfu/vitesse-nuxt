<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <div>Hi: {{ route.params.id }}</div>

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
