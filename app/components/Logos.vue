<template>
  <div text-2xl font-300 inline-flex cursor-default>
    <div flex flex-col children:mx-auto>
      <img h-18 w-18 inline-block src="/nuxt.svg">
      <span text-green5 mt--2>Nuxt 3</span>
    </div>
    <div
      text="3xl gray4"
      m="x-4 y-auto"
      i-carbon-add transform transition-all-500 hover:rotate-135
    />
    <div flex flex-col children:mx-auto>
      <img h-18 w-18 inline-block src="/vite.png">
      <span text-purple-500 mt--2>Vitesse</span>
    </div>
  </div>
</template>
