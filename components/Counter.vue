<script setup lang="ts">
import * as $ from 'rxjs'

const count = ref(0)

const incBtn = ref<HTMLInputElement | null>(null)
const decBtn = ref<HTMLInputElement | null>(null)
onMounted(() => {
  const inc$ = $.fromEvent(incBtn.value!, 'click').pipe($.map(() => 1))
  const dec$ = $.fromEvent(decBtn.value!, 'click').pipe($.map(() => -1))
  $.merge(inc$, dec$)
    .pipe($.scan((total, change) => total + change))
    .subscribe((c) => (count.value = c))
})
</script>

<template>
  <div inline-flex m="y-3">
    <button ref="decBtn" btn p-2 rounded-full>
      <div i-carbon-subtract />
    </button>
    <div id="count" font="mono" w="15" m-auto inline-block>
      {{ count }}
    </div>
    <button ref="incBtn" btn p-2 rounded-full>
      <div i-carbon-add />
    </button>
  </div>
</template>

<style lang="scss">
#count {
  color: red;
}
</style>
