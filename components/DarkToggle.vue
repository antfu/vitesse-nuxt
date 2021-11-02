<script setup lang='ts'>
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="!outline-none" @click="toggleDark()">
    <div v-if="isDark" class="i-carbon-moon" />
    <div v-else class="i-carbon-sun" />
  </button>
</template>
