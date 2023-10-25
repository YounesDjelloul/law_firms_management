<script setup lang="ts">
import APP_URLs from '/@src/constants/app/urls'

import type { SidebarTheme } from '/@src/components/navigation/desktop/Sidebar.vue'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useHandleTimeEntries } from '/@src/stores/handleTimeEntries'
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'

import { formatting } from '/@src/utils/app'

const handleTimeEntries = useHandleTimeEntries()
const handleComponent = useHandleCurrentComponent()

watchEffect(async () => {
  // We change watchEffect with watch to fix the problem of unique pages
  const canFetchRecords =
    !handleComponent.currentPageDependencies.renderLoading && !handleComponent.isLoading

  if (canFetchRecords) {
    await handleTimeEntries.fetchRecords()
  }
})

const props = withDefaults(
  defineProps<{
    theme?: SidebarTheme
    defaultSidebar?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSidebar: 'dashboard',
    theme: 'default',
  }
)

const viewWrapper = useViewWrapper()
const route = useRoute()
const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSidebar)

function switchSidebar(id: string) {
  if (id === activeMobileSubsidebar.value) {
    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
  } else {
    isDesktopSidebarOpen.value = true
    activeMobileSubsidebar.value = id
  }
}

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  viewWrapper.setPushed(isDesktopSidebarOpen.value ?? false)
})
watch(
  () => route.fullPath,
  () => {
    isMobileSidebarOpen.value = false

    if (props.closeOnChange && isDesktopSidebarOpen.value) {
      isDesktopSidebarOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <CreateAutoStartTimeEntryComponent
      v-if="handleTimeEntries.showCreateTimeEntryPopup && !handleTimeEntries.isLoading"
    />
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink to="/" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <NotificationsMobileDropdown />
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <li>
          <RouterLink :to="APP_URLs.DASHBOARD.url">
            <i aria-hidden="true" class="iconify" data-icon="feather:home"></i>
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li>
          <a href="#">
            <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <Transition name="slide-x">
      <DashboardsMobileSubsidebar
        v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'dashboard'"
      />
    </Transition>

    <Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">
      <template #links>
        <!-- Dashboards -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']"
            data-content="Dashboard"
            tabindex="0"
            @keydown.space.prevent="switchSidebar('dashboard')"
            @click="switchSidebar('dashboard')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:home"
            ></i>
          </a>
        </li>
      </template>
      <template #bottom-links>
        <li>
          <ProfileSideBarDropdown class="is-up" />
        </li>
      </template>
    </Sidebar>

    <Transition name="slide-x">
      <DashboardsSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'dashboard'"
        @close="isDesktopSidebarOpen = false"
      />
    </Transition>

    <LanguagesPanel />

    <VViewWrapper>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <VPageContent v-else class="is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              tabindex="0"
              @keydown.space.prevent="isDesktopSidebarOpen = !isDesktopSidebarOpen"
              @click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
            >
              <span class="menu-toggle has-chevron">
                <span :class="[isDesktopSidebarOpen && 'active']" class="icon-box-toggle">
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">{{ viewWrapper.pageTitle }}</h1>
              <VDropdown>
                <template #button="{ open, toggle }">
                  <VButton
                    v-if="handleTimeEntries.isLoading"
                    class="timer-button"
                    placeload="40px"
                    color="primary"
                  >
                    Button
                  </VButton>
                  <VButton
                    v-else-if="handleTimeEntries.runningLength == 0"
                    v-tooltip.bottom.right.info.rounded="'Click to create new time entry'"
                    class="timer-button"
                    icon="feather:play"
                    color="primary"
                    @click="handleTimeEntries.showCreateTimeEntryPopup = true"
                  >
                    Start Timer
                  </VButton>
                  <VButton
                    v-else
                    v-tooltip.bottom.right.info.rounded="'Click to create new time entry'"
                    icon="feather:clock"
                    class="is-trigger timer-button counter-running"
                    color="primary"
                    @mouseenter="open"
                    @focusin="open"
                    @click="handleTimeEntries.showCreateTimeEntryPopup = true"
                  >
                    {{
                      formatting.getFormattedTime(handleTimeEntries.firstRecord['hours'])
                    }}
                  </VButton>
                </template>

                <template #content="{ close }">
                  <div @mouseleave="close" @focusout="close">
                    <VMessage
                      v-for="record in handleTimeEntries.runningTimeEntries"
                      :key="record.id"
                      class="dropdown-item"
                    >
                      <div class="counter-details-container">
                        <VIconButton
                          color="primary"
                          outlined
                          circle
                          icon="feather:pause"
                          @click="handleTimeEntries.toggleTimeEntryCounter(record)"
                        />
                        <div>
                          {{ record.activity.label }}
                          <div>{{ record.rate }}</div>
                          <div>{{ formatting.getFormattedTime(record.hours) }}</div>
                        </div>
                      </div>
                    </VMessage>
                  </div>
                </template>
              </VDropdown>
            </div>

            <Toolbar class="mobile-toolbar">
              <ToolbarNotification />
            </Toolbar>
          </div>

          <slot></slot>
        </VPageContent>
      </VPageContentWrapper>
    </VViewWrapper>
  </div>
</template>

<style lang="scss">
.dropdown-menu {
  width: 250px;

  .message {
    margin: 10px;
    padding: 0.375rem 0.5rem;
    padding-inline-end: 0;

    .message-body {
      padding: 0.5em 0.5em;

      .counter-details-container {
        display: flex !important;

        > button {
          width: 41px !important;
        }

        > div:last-child {
          margin-left: 15px;
          position: relative;
          top: -2px;

          > span:first-child {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.title-wrap {
  display: flex;

  .timer-button {
    left: 15px;
    height: 30px !important;
    font-size: 0.85rem !important;
    padding-top: 6px;

    span:last-child {
      position: relative;
      top: -3px;
    }
  }
}
</style>