<script setup lang="ts">
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'

const props = defineProps<{
  toChange: boolean
  toDelete: boolean
  instance: object
}>()

const handleInstance = useHandleCurrentComponent()
</script>

<template>
  <VDropdown icon="feather:more-vertical" class="is-pushed-mobile" spaced right>
    <template #content="{ close }">
      <a
        href=""
        class="dropdown-item is-media"
        @click.prevent="handleInstance.getViewInstanceDetailsPopup(instance)"
        @keydown="handleInstance.getViewInstanceDetailsPopup(instance)"
      >
        <div class="icon">
          <span class="iconify" data-icon="feather:eye"></span>
        </div>
        <div class="meta">
          <span>View</span>
          <span>View Record details</span>
        </div>
      </a>

      <a
        href=""
        class="dropdown-item is-media"
        :class="{ disabled: !toChange }"
        @click.prevent="handleInstance.getUpdateInstanceDetailsPopup(instance)"
        @keydown="handleInstance.getUpdateInstanceDetailsPopup(instance)"
      >
        <div class="icon">
          <span class="iconify" data-icon="feather:edit-2"></span>
        </div>
        <div class="meta">
          <span>Update</span>
          <span>Update record</span>
        </div>
      </a>

      <a
        href=""
        class="dropdown-item is-media"
        @click.prevent="handleInstance.getFolderExplorerPopup($route.meta.name)"
        @keydown="handleInstance.getFolderExplorerPopup($route.meta.name)"
      >
        <div class="icon">
          <span class="iconify" data-icon="feather:file"></span>
        </div>
        <div class="meta">
          <span>Explore</span>
          <span>Explore record folder</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        href=""
        class="dropdown-item is-media"
        :class="{ disabled: !toDelete }"
        @click.prevent="handleInstance.getDeleteInstancePopup(instance)"
        @keydown="handleInstance.getDeleteInstancePopup(instance)"
      >
        <div class="icon">
          <span class="iconify" data-icon="feather:delete"></span>
        </div>
        <div class="meta">
          <span>Remove</span>
          <span>Delete record</span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>

<style lang="scss">
.dropdown-item {
  color: black !important;

  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>