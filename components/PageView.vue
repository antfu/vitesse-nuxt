<script setup lang="ts">
const { data } = await useFetch('/api/pageview')
</script>

<template>
  <div op50>
    Pageview: {{ data.pageview }}
  </div>
</template>
