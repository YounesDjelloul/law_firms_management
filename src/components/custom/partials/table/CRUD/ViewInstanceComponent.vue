<script setup lang='ts'>
import { formatting } from '/@src/utils/app'
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'

const props = defineProps<{
  modalTitle: string
}>()

const handleInstance = useHandleCurrentComponent()

const isLoading = ref(true)
const currentInstance = ref(formatting.formatView(handleInstance.instanceToAct))

isLoading.value = false
</script>

<template>
  <VModal
    :open="true"
    :title="modalTitle"
    size="large"
    actions="right"
    noscroll
    @close="handleInstance.showViewInstanceDetailsPopup = false"
  >
    <template #content>
      <VLoader :active="isLoading">
        <div class="view-container">
          <div class="view-section">
            <table class="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th scope="col">Field Name</th>
                  <th scope="col" class="is-end">
                    <div class="is-flex is-justify-content-flex-end">Value</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, detail) in currentInstance"
                  :key="value"
                  class="view-section-info"
                >
                  <td>{{ detail }}</td>
                  <td class="is-end is-justify-content-flex-end">
                    <div class="is-flex is-justify-content-flex-end">
                      {{ value }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </VLoader>
    </template>
  </VModal>
</template>

<style lang="scss" scoped>
.view-section {
  display: flex;
  justify-content: center;
}
</style>