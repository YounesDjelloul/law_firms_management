<script setup="ts">
import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

const renderLoading = ref(false)

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Profile Settings')

useHead({
  title: 'Profile Settings - LexAlgeria',
})
</script>

<template>
  <LoaderContainerComponent :render-loading="renderLoading">
    <ProfileSettings />
  </LoaderContainerComponent>
</template>