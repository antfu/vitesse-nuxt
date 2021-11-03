<script setup lang="ts">
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div>
    <div>Hi: {{ route.params.id }}</div>

    <div>
      <button
        class="btn m-3 text-sm mt-6"
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
