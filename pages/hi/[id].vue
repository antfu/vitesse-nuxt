<script setup lang="ts">
const route = useRoute()
const user = useUserStore()
const name = route.params.id

watchEffect(() => {
  user.setNewName(route.params.id as string)
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <div
      i-twemoji:waving-hand
      text-4xl
      inline-block
      animate-shake-x
      animate-duration-5000
    />
    <h3 text-2xl font-500>Hi,</h3>
    <div text-xl>{{ name }}!</div>

    <template v-if="user.otherNames.length">
      <p text-sm my-4>
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
      <NuxtLink class="btn m-3 text-sm" to="/"> {{ $t('back') }} </NuxtLink>
    </div>
  </div>
</template>
