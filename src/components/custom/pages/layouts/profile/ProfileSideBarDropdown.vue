<script setup>
import { useUserSession } from '/@src/stores/userSession'
import { useNotyf } from '/@src/composable/useNotyf'
import { useI18n } from 'vue-i18n'

import APP_URLs from '/@src/constants/app/urls'

const { t } = useI18n()
const router = useRouter()
const notyf = useNotyf()
const userSession = useUserSession()

const currentUser = userSession.getUser()

function logout() {
  userSession.logoutUser()
  notyf.success(t('auth.logout.success'))
  router.push(APP_URLs.LOGIN)
}
</script>

<template>
  <VDropdown right spaced class="user-dropdown profile-dropdown">
    <template #button="{ toggle }">
      <a
        role="button"
        tabindex="0"
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @keydown.space.prevent="toggle"
        @click="toggle"
      >
        <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />

        <div class="meta">
          <span>{{ currentUser.first_name }} {{ currentUser.last_name }}</span>
          <span>{{ currentUser.phone_number }}</span>
        </div>
      </div>

      <RouterLink
        :to="APP_URLs.VIEW_PROFILE"
        role="menuitem"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <span class="iconify" data-icon="feather:user"></span>
        </div>
        <div class="meta">
          <span>Profile</span>
          <span>View your profile</span>
        </div>
      </RouterLink>

      <hr class="dropdown-divider" />

      <RouterLink
        :to="APP_URLs.PROFILE_SETTINGS"
        role="menuitem"
        class="dropdown-item is-media"
      >
        <div class="icon">
          <span class="iconify" data-icon="feather:settings"></span>
        </div>
        <div class="meta">
          <span>Settings</span>
          <span>Account settings</span>
        </div>
      </RouterLink>

      <hr class="dropdown-divider" />

      <div class="dropdown-item is-button">
        <VButton
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          @click="logout"
        >
          Logout
        </VButton>
      </div>
    </template>
  </VDropdown>
</template>
  
<style lang="scss">
.dropdown-head {
  padding: 20px 16px 0px !important;

  .v-avatar {
    margin-bottom: 20px !important;
  }

  .meta {
    top: -10px;
    position: relative;
  }
}
</style>