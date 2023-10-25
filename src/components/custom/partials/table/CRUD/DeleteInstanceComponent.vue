<script setup lang='ts'>
import { useNotyf } from '/@src/composable/useNotyf'
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'

import { models } from '/@src/services/api'

const props = defineProps<{
  modalTitle: string
}>()

const notyf = useNotyf()
const handleInstance = useHandleCurrentComponent()

const { modelPk, endpointUrl } = handleInstance.currentPageDependencies

const isLoading = ref(false)

async function onDelete() {
  isLoading.value = true

  try {
    await models.deleteInstanceRequest(endpointUrl, handleInstance.instanceToAct[modelPk])
    handleInstance.handleInstanceDeleteAffect()
  } catch (err) {
    console.log(err)
    notyf.error(err.response.data)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <VModal
    :open="true"
    :title="modalTitle"
    size="meduim"
    actions="right"
    noscroll
    @close="handleInstance.showDeleteInstancePopup = false"
  >
    <template #content>
      <div class="view-container">
        <VLoader :active="isLoading">
          <div v-if="!isLoading" class="view-section">
            <div class="delete-header">
              <h3 class="content">Are you sure you want to delete this record?</h3>
            </div>
          </div>
        </VLoader>
      </div>
    </template>
    <template #action>
      <VButton :loading="isLoading" type="submit" color="danger" raised @click="onDelete"
        >Delete</VButton
      >
    </template>
  </VModal>
</template>

<style lang="scss">
.delete-header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-alt);
  font-size: 1.05rem;
  font-weight: 900;
}
</style>