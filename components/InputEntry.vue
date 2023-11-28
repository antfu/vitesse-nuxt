<script setup lang="ts">
const name = ref('')

function go(): void {
  if (name.value) {
    void navigateTo({
      name: 'hi-id',
      params: { id: name.value as string },
    })
  }
}

const { t } = useI18n({
  useScope: 'local',
})
</script>

<template>
  <div>
    <input
      id="input"
      v-model="name"
      :placeholder="t('inputName')"
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
    >
    <div>
      <button m-3 text-sm btn :disabled="!name" @click="go">
        {{ $t('go') }}
      </button>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  inputName: What's your name?
zh-CN:
  inputName: 你的名字？
</i18n>
