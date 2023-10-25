<script setup lang="ts">
const emit = defineEmits(['close'])

import APP_URLs from '/@src/constants/app/urls'
import { useUserSession } from '/@src/stores/userSession'

const userSession = useUserSession()

let permissions = userSession.cookies.get('view_permissions')

const currentUrls = computed(() => {
  const grouped = {}

  for (const urlName in APP_URLs) {
    const urlObject = APP_URLs[urlName]

    if (typeof urlObject == 'string' || !permissions.includes(urlObject.modelName)) {
      continue
    }
    const routeParts = urlObject.groupName.split('/')
    let currentGroup = grouped

    for (const part of routeParts) {
      if (!currentGroup[part]) {
        currentGroup[part] = {}
      }
      currentGroup = currentGroup[part]
    }

    Object.assign(currentGroup, APP_URLs[urlName])
  }

  return grouped
})
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Sides</h3>
      <div
        class="panel-close"
        tabindex="0"
        @keydown.space.prevent="emit('close')"
        @click="emit('close')"
      >
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <DashboardSideBarCollapse :groups="currentUrls" />
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/layout/sidebar-panel';

.inner ul > li {
  margin-top: 10px;
}

.inner ul > li > ul {
  margin-top: 5px;
}

.sidebar-panel.is-generic .inner li {
  height: fit-content !important;
  flex-direction: column;

  > a {
    margin-bottom: 16px;

    padding-inline-start: 20px !important;
  }

  > a:last-child {
    margin-bottom: 0;
  }
}
</style>
