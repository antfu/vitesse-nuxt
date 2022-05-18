<script setup lang="ts">
import 'element-plus/theme-chalk/src/button.scss'

import { ElButton } from 'element-plus'

const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <div>Not found</div>
    <div>
      <el-button text-sm m="3 t8" @click="router.back()">Back</el-button>
    </div>
  </main>
</template>
