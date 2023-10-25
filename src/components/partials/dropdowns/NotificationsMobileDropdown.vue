<script setup lang="ts">
import { useDropdown } from '/@src/composable/useDropdown'
import { onceImageErrored } from '/@src/utils/via-placeholder'

const dropdownElement = ref<HTMLElement>()
const dropdown = useDropdown(dropdownElement)
</script>

<template>
  <div
    ref="dropdownElement"
    class="navbar-item has-dropdown is-notification is-hidden-tablet is-hidden-desktop"
  >
    <a
      class="navbar-link is-arrowless"
      tabindex="0"
      @keydown.space.prevent="dropdown.toggle"
      @click="dropdown.toggle"
    >
      <i aria-hidden="true" class="iconify" data-icon="feather:bell"></i>
      <span class="new-indicator pulsate"></span>
    </a>
    <div class="navbar-dropdown is-boxed is-right">
      <div class="heading">
        <div class="heading-left">
          <h6 class="heading-title">Notifications</h6>
        </div>
        <div class="heading-right">
          <a class="notification-link" href="#">See all</a>
        </div>
      </div>
      <div class="inner has-slimscroll">
        <ul class="notification-list"></ul>
      </div>
    </div>
  </div>
</template>
