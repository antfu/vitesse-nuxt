<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const online = useOnline()
const hiOffline = ref(false)

function checkHiOnline() {
  hiOffline.value = !online.value && route.path.startsWith('/hi')
}

// eslint-disable-next-line n/prefer-global/process
if (process.client)
  watch(() => [online.value, route], checkHiOnline, { immediate: true, flush: 'post' })

onBeforeMount(checkHiOnline)
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <div v-if="hiOffline">
      You're offline, don't refresh the page
    </div>
    <div v-else>
      Not found
    </div>
    <div>
      <button text-sm btn m="3 t8" @click="router.back()">
        Back
      </button>
    </div>
  </main>
</template>
