<script setup lang="ts">
import { usePersonQuery } from '~/graphql/generated/hello.query'

const { data, fetching, error } = usePersonQuery({
  variables: ref({
    personInput: {
      name: 'Phil Xu',
    },
  }),
})
</script>

<template>
  <div>
    <div>
      <h3 text-2xl font-500>Graphql Api</h3>
      <div v-show="fetching">
        {{ $t('ssrLoading') }}
      </div>
      <div v-if="data && data.person">
        {{ $t('ssrMode') }}: {{ $t(data.person.name) }}
      </div>
      <div v-else-if="error">
        {{ error }}
      </div>

      <div>
        <NuxtLink class="btn m-3 text-sm" to="/restful/page-view">
          RESTful Api
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
