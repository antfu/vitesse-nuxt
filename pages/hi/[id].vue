<script setup lang="ts">
const route = useRoute<'hi-id'>()
const user = useUserStore()
const name = route.params.id

watchEffect(() => {
  user.setNewName(route.params.id)
})

definePageMeta({
  layout: 'home',
})

const { t } = useI18n({
  useScope: 'local'
})
</script>

<template>
  <div>
    <div i-twemoji:waving-hand inline-block animate-shake-x animate-duration-5000 text-4xl />
    <h3 text-2xl font-500>
      {{ t('hi') }}
    </h3>
    <div text-xl>
      {{ name }}!
    </div>

    <template v-if="user.otherNames.length">
      <p my-4 text-sm>
        <span op-50>Also as known as:</span>
        <ul>
          <li v-for="otherName in user.otherNames" :key="otherName">
            <router-link :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </router-link>
          </li>
        </ul>
      <!-- Workaround for: https://github.com/prettier/prettier/issues/12388 -->
      <!-- eslint-disable-next-line prettier/prettier -->
      </p>
    </template>

    <Counter />

    <div>
      <NuxtLink
        class="btn m-3 text-sm"
        to="/"
      >
        {{ $t('back') }}
      </NuxtLink>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  hi: Hi,
zh-CN:
  hello: こんにちは、世界!
</i18n>
