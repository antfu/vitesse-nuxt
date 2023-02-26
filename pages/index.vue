<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <div>
        <PageView />
        <div v-if="!online" text-gray:80>
          You're offline
        </div>
      </div>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
