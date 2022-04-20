<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
  color.preference = color.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class="dark:i-carbon-moon i-carbon-sun" />
  </button>
</template>
