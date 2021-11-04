<script setup lang="ts">
const { data } = await useFetch('/api/pageview')
</script>

<template>
  <div>
    Page view: {{ data.pageview }}
  </div>
</template>
