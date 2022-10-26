<script setup lang="ts">
// FIXME: This giving `typescript-eslint` issues when auto-imported
import { useFetch } from '#imports'

const { data } = await useFetch('/api/pageview' as const)
const time = useTimeAgo(computed(() => data.value!.startAt))
</script>

<template>
  <div>
    <h3 text-2xl font-500>RESTful Api</h3>
    <span v-if="data" font-500 text-gray>
      {{
        $t('visited', {
          count: data.pageview,
          time,
        })
      }}
    </span>
    <div>
      <NuxtLink class="btn m-3 text-sm" to="/">
        {{ $t('back') }}
      </NuxtLink>
    </div>
  </div>
</template>
