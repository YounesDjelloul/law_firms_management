<script setup lang="ts">
import { useHandleInstance } from '/@src/stores/handleInstance'

const props = defineProps<{
  toChange: boolean
  toDelete: boolean
}>()

const handleInstance = useHandleInstance()
</script>

<template>
  <VDropdown icon="feather:more-vertical" class="is-pushed-mobile" spaced right>
    <template #content="{ close }">
      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="handleInstance.getViewInstanceDetailsPopup"
      >
        <div class="icon">
          <i aria-hidden="true" class="feather:eye"></i>
        </div>
        <div class="meta">
          <span>View</span>
          <span>View Record details</span>
        </div>
      </a>

      <a
        v-if="toChange"
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="handleInstance.getUpdateInstanceDetailsPopup"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-briefcase"></i>
        </div>
        <div class="meta">
          <span>Update</span>
          <span>Update record</span>
        </div>
      </a>

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="handleInstance.getFolderExplorerPopup($route.meta.name)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Explore</span>
          <span>Explore record folder</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        v-if="toDelete"
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click.prevent="handleInstance.getDeleteInstancePopup"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>Remove</span>
          <span>Delete record</span>
        </div>
      </a>
    </template>
  </VDropdown>
</template>
