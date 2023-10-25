<script setup lang="ts">
const props = defineProps<{
  title: string
  initStatus: boolean
}>()

const collapsed = ref(props.initStatus)
</script>

<template>
  <div class="collapse-container" :class="{ 'is-collapsed': collapsed }">
    <div
      class="collapse-header"
      @click="collapsed = !collapsed"
      @keydown="collapsed = !collapsed"
    >
      <span>{{ title }}</span>
      <a v-if="collapsed" class="new-instance-button collapse-button">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </a>
      <a v-else class="new-instance-button collapse-button">
        <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
      </a>
    </div>
    <div v-show="collapsed" class="collapse-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.collapse-container {
  overflow: hidden;
  width: 100%;
  border-radius: 5px;
  padding-bottom: 5px;
  background: var(--dark-sidebar-light-8);
  border: 1px solid var(--dark-sidebar-light-12);
  transition: padding-bottom 0.5s ease-in-out;
  margin-bottom: 20px;

  .collapse-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 10px 0px 20px;
    cursor: pointer;

    .collapse-button {
      position: initial;
      background: transparent !important;
      border: none;
    }
  }

  .collapse-content {
    transition: max-height 0.3s ease;
    padding: 10px 10px 10px 20px;
  }
}
</style>