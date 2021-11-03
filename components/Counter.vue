<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div m="y-3">
    <button class="btn" @click="dec()">
      -
    </button>
    <div font="mono" w="15" inline-block>
      {{ count }}
    </div>
    <button class="btn" @click="inc()">
      +
    </button>
  </div>
</template>
