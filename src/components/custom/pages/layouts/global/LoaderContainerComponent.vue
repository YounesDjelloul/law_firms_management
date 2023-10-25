<script setup lang="ts">
import { useHandleError } from '/@src/stores/handleError'
import { storeToRefs } from 'pinia'

const handleError = useHandleError()

const { errorTitle, errorDetails, currentStatus } = storeToRefs(handleError)

const props = defineProps<{
  renderLoading
}>()
</script>

<template>
  <VLoader :active="renderLoading">
    <div v-if="renderLoading" class="placeholder-loader"></div>
    <div
      v-else-if="errorTitle.length > 0 && currentStatus == 401"
      else-
      class="redirection-popup"
    >
      <VModal
        :open="errorTitle.length > 0 && currentStatus == 401"
        size="small"
        :title="errorTitle"
        actions="center"
        noscroll
        noclose
      >
        <template #content>
          <div class="redirection-popup">
            {{ errorDetails }}
          </div>
        </template>
      </VModal>
    </div>
    <VCard v-else-if="errorTitle.length > 0" radius="small" color="warning">
      <h3 class="title is-5 mb-2">{{ errorTitle }}</h3>
      <p>
        {{ errorDetails }}
      </p>
    </VCard>
    <slot v-else />
  </VLoader>
</template>