<script setup lang="ts">
import { useOnline } from '@vueuse/core'
import { definePageMeta } from '#app/composables/pages'
import { ClientOnly } from '#components'
import InputEntry from '~/components/InputEntry.vue'
import Logos from '~/components/Logos.vue'
import PageView from '~/components/PageView.vue'

definePageMeta({
  layout: 'home',
})

const online = useOnline()
</script>

<template>
  <div>
    <Logos mb-6 />
    <ClientOnly>
      <Suspense>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
        <template #fallback>
          <div op50 italic>
            <span animate-pulse>Loading...</span>
          </div>
        </template>
      </Suspense>
      <template #fallback>
        <div op50>
          <span animate-pulse>...</span>
        </div>
      </template>
    </ClientOnly>
    <InputEntry />
  </div>
</template>
