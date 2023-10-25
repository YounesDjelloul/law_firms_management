<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const renderLoading = ref(false)

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Files Explorer')

useHead({
  title: 'Lex Algeria - Files Explorer',
})
</script>

<template>
  <LoaderContainerComponent :render-loading="renderLoading">
    <FileExplorerComponent />
  </LoaderContainerComponent>
</template>