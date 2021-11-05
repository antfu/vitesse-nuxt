<script setup lang="ts">
const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(computed(() => data.value.startAt))
</script>

<template>
  <div text-gray>
    <span font-500>{{ data.pageview }}</span> page views since <span font-500>{{ time }}</span>
  </div>
</template>
