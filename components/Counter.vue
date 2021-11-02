<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div m="y-3">
    <button border="~ rounded gray-400" class="px-2 mx-2 hover:bg-gray-400/20 !outline-none" @click="dec()">
      dec
    </button>
    <span font="mono">{{ count }}</span>
    <button border="~ rounded gray-400" class="px-2 mx-2 hover:bg-gray-400/20 !outline-none" @click="inc()">
      inc
    </button>
  </div>
</template>
