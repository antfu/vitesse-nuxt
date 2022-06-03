<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <Home />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
