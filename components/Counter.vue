<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div inline-flex m="y-3">
    <button btn class="!p-2" @click="dec()">
      <div i-carbon-subtract></div>
    </button>
    <div font="mono" w="15" m-auto inline-block>
      {{ count }}
    </div>
    <button btn class="!p-2" @click="inc()">
      <div i-carbon-add></div>
    </button>
  </div>
</template>
