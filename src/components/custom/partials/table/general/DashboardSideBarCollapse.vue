<script setup lang="ts">
const props = defineProps<{
  groups: object
}>()

const openSubsidebarLinks = ref('')
const checkUrls = (item) => Object.keys(item)[0] !== 'groupName'
</script>

<template>
  <VCollapseLinks
    v-for="(urls, groupName) of groups"
    :key="groupName"
    v-model:open="openSubsidebarLinks"
    :collapse-id="groupName"
  >
    <template #header>
      {{ groupName }}
      <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
    </template>
    <div
      v-for="(item, key) of urls"
      :key="item.modelName"
      :class="{ 'is-group': checkUrls(item) }"
    >
      <DashboardSideBarCollapse v-if="checkUrls(item)" :groups="{ [key]: item }" />
      <RouterLink v-else :key="item.modelName" :to="item.url" class="is-submenu">
        <i aria-hidden="true" class="lnil lnil-analytics-alt-1"></i>
        <span>{{ item.displayName }}</span>
      </RouterLink>
    </div>
  </VCollapseLinks>
</template>

<style lang="scss">
.collapse-content {
  > li {
    .is-group {
      padding-left: 25px;
    }

    > div {
      width: 100%;
      padding-left: 15px;
    }

    a {
      padding-inline-start: 0;
      padding: 0 10px 15px 5px !important;
    }
  }
}
</style>