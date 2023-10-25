import { definePlugin } from '/@src/app'
import { useUserSession } from '/@src/stores/userSession'
import { useHandleError } from '../stores/handleError'

import APP_URLs from '/@src/constants/app/urls'
import Cookies from 'js-cookie'

/**
 * Here we are setting up two router navigation guards
 * (note that we can have multiple guards in multiple plugins)
 *
 * We can add meta to pages either by declaring them manualy in the
 * routes declaration (see /@src/router.ts)
 * or by adding a <route> tag into .vue files (see /@src/pages/sidebar/dashboards.ts)
 *
 * <route lang="yaml">
 * meta:
 *   requiresAuth: true
 * </route>
 *
 * <script setup lang="ts">
 *  // TS script
 * </script>
 *
 * <template>
 *  // HTML content
 * </template>
 */
export default definePlugin(async ({ router, pinia /* api */ }) => {
  const handleError = useHandleError()

  router.afterEach(() => {
    handleError.clearError()
  })

  router.beforeEach(async (to) => {
    const { view_permissions: viewPermissions, isLoggedIn: authenticated } = Cookies.get()

    const loginUrl = APP_URLs.LOGIN

    if (to.meta.requiresAuth && authenticated !== 'true') {
      // If the page requires auth, check if user is logged in
      // if not, redirect to login page.
      return {
        name: loginUrl,
        query: { redirect: to.fullPath },
      }
    }

    if (authenticated == 'true') {
      if (to.meta.guest) {
        return {
          name: APP_URLs.HOME.url,
        }
      }

      if (viewPermissions) {
        if (to.meta.name && !viewPermissions.includes(to.meta.name)) {
          return {
            name: APP_URLs.HOME.url,
          }
        }
      }

      // // Check token validity at each page
      // try {
      //   await userSession.getAndSavePermissions()
      // } catch (error) {
      //   console.log(error)
      //   const refreshTokenCheck =
      //     cookies.get('refresh_token') !== '' || cookies.get('refresh_token')
      //       ? true
      //       : false

      //   if (error.response.status === 401 && refreshTokenCheck) {
      //     try {
      //       await auth.newAccessToken(userSession)
      //     } catch (err) {
      //       if (err.status === 400) {
      //         userSession.logoutUser()
      //         return {
      //           name: loginUrl,
      //           query: { redirect: to.fullPath },
      //         }
      //       }
      //     }
      //   } else if (error.response.status === 401 && !refreshTokenCheck) {
      //     userSession.logoutUser()
      //     return {
      //       name: loginUrl,
      //       query: { redirect: to.fullPath },
      //     }
      //   }
      // } finally {
      //   /*if (userSession.permissions) {
      //     if (to.meta.name && !userSession.permissions.view.includes(to.meta.name)) {
      //       return {
      //         name: APP_URLs.HOME.url,
      //       }
      //     }
      //   }*/
      // }
    }
  })
})
