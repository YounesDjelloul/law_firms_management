<script setup lang="ts">
const renderLoading = ref(false)
</script>

<template>
  <LoaderContainerComponent :render-loading="renderLoading">
    <ViewProfile />
  </LoaderContainerComponent>
</template>