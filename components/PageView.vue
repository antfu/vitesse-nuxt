<script setup lang="ts">
const { t } = useI18n()

const { data } = await useFetch('/api/pageview' as const)
const time = useTimeAgo(
  computed(() => data.value?.startAt ?? new Date()),
  {
    fullDateFormatter: (date: Date) => date.toLocaleDateString(),
    messages: {
      justNow: t('justNow'),
      past: (n: number | string) =>
        String(n).match(/\d/) ? t('timeAgo', [n]) : String(n),
      future: (n: number | string) =>
        String(n).match(/\d/) ? t('inTime', [n]) : String(n),
      invalid: 'invalid',
      second: (n: number | string) => `${n} ${t(`second${n > 1 ? 's' : ''}`)}`,
      minute: (n: number | string) => `${n} ${t(`minute${n > 1 ? 's' : ''}`)}`,
      hour: (n: number | string) => `${n} ${t(`hour${n > 1 ? 's' : ''}`)}`,
      day: (n: number | string, past: boolean) =>
        n === 1
          ? past
            ? t('yesterday')
            : t('tomorrow')
          : `${n} ${t(`day${n > 1 ? 's' : ''}`)}`,
      week: (n: number | string, past: boolean) =>
        n === 1
          ? past
            ? t('last week')
            : t('next week')
          : `${n} ${t(`week${n > 1 ? 's' : ''}`)}`,
      month: (n: number | string, past: boolean) =>
        n === 1
          ? past
            ? t('last month')
            : t('next month')
          : `${n} ${t(`month${n > 1 ? 's' : ''}`)}`,
      year: (n: number | string, past: boolean) =>
        n === 1
          ? past
            ? t('last year')
            : t('next year')
          : `${n} ${t(`year${n > 1 ? 's' : ''}`)}`,
    },
  },
)
</script>

<template>
  <div text-gray:80>
    <span v-if="data" font-500 text-gray>
      {{
        $t('visited', {
          count: data.pageview,
          time,
        })
      }}
    </span>
  </div>
</template>
