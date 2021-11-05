<template>
  <div>
    <img w-16 inline-block src="/nuxt.png" />
    <img w-16 inline-block src="/vite.png" />
    <h1 mt-1 text-2xl cursor-default>
      <span text-green-500 hover:text-white hover:bg-green-600>Nuxt 3</span>
      <span text-gray-400 mx-2>+</span>
      <span text-purple-500>Vitesse</span>
    </h1>
    <Suspense>
      <PageView />
      <template #fallback>
        <div op50 italic animate-pulse>
          Loading...
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
