<script setup lang="ts">
import { useTypedRouter } from '~~/generated'

const { router, routes } = useTypedRouter()
const name = ref('')

const go = (): void => {
  if (name.value) {
    void router.push({
      name: routes.hiId,
      params: { id: encodeURIComponent(name.value) },
    })
  }
}
</script>

<template>
  <div>
    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="off"
      p="x-4 y-2"
      m="t-5"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    />
    <div>
      <button m-3 text-sm btn :disabled="!name" @click="go">GO</button>
    </div>
  </div>
</template>
