<script setup lang="ts">
const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(() => data.value?.startAt || 0)

const { t } = useI18n({
  useScope: 'local'
})
</script>

<template>
  <div text-gray:80>
    {{ t('visited', { count: data?.pageview, time }) }}
  </div>
</template>

<i18n lang="yaml">
en:
  visited: '{count} page views since {time}'
zh-CN:
  visited: '自{time}以来访问了{count}次'
</i18n>
