<template>
  <main py-40 px-20 text-center>
    <img w-16 inline-block src="/nuxt.png" />
    <img w-16 inline-block src="/vite.png" />
    <h1 mt-5 text-green-500 text-4xl cursor-default>
      <span hover:text-white hover:bg-green-600>Nuxt 3</span>
      <span text-gray-400>+</span>
      <span text-purple-600>Vitesse</span>
    </h1>
    <Hello />
    <Counter />
    <div
      text="3xl gray-500"
      m-5
      flex
      justify-center
      gap-2
    >
      <a i-carbon-campsite href="https://github.com/antfu/vitesse-nuxt" target="__blank" />
      <DarkToggle />
    </div>
  </main>
</template>
