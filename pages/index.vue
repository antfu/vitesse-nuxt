<template>
  <div>
    <Logos mb-6 />
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
