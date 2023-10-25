<script setup lang="ts">
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'

const props = defineProps<{
  componentDependencies: object
  renderLoading: boolean
}>()

const handleComponent = useHandleCurrentComponent()

const renderLoading = computed(() => props.renderLoading)

watchEffect(async () => {
  if (!renderLoading.value) {
    handleComponent.currentPageDependencies = props.componentDependencies
    await handleComponent.generatePageDependencies()
  }
})
</script>

<template>
  <div class="page-content-inner">
    <div class="column is-12">
      <LoaderContainerComponent :render-loading="renderLoading">
        <TableListV1 />
      </LoaderContainerComponent>
    </div>
  </div>
</template>

<style lang="scss">
.dataTable-table > thead > tr > th {
  vertical-align: middle;
}

.v-loader-wrapper {
  background-color: transparent !important;
}

.redirection-popup {
  font-weight: bold;
  text-align: -webkit-center;
}
</style>