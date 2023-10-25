import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { users } from '/@src/services/api'
import Cookies from 'js-cookie'

export type UserData = Record<string, any> | null

export const useUserSession = defineStore('userSession', () => {
  const permissions = ref({})
  const loading = ref(true)

  async function getAndSavePermissions() {
    const userPermissions = await users.getUserPermissions()
    const formattedPermissions = { view: ['home', 'dashboard', 'fileexplorer'] }

    for (const one of userPermissions) {
      const current = one.codename.split('_')
      const modelPermission = current[0]
      const modelName = current[1]

      if (current[0] in formattedPermissions) {
        formattedPermissions[modelPermission].push(modelName)
      } else {
        formattedPermissions[modelPermission] = [modelName]
      }
    }

    permissions.value = formattedPermissions
  }

  function setUser(currentUser) {
    Cookies.set('user', JSON.stringify(currentUser))
  }

  function getUser() {
    const { user } = Cookies.get()
    if (user !== undefined) {
      return JSON.parse(user)
    }

    return undefined
  }

  async function setAccessToken(newToken: string) {
    Cookies.set('access_token', newToken)
    Cookies.set('isLoggedIn', true)
  }

  function setViewPermissions(viewPermissions: []) {
    viewPermissions = viewPermissions.concat(['home', 'dashboard', 'fileexplorer'])
    Cookies.set('view_permissions', viewPermissions)
  }

  function setRefreshToken(newToken: string) {
    Cookies.set('refresh_token', newToken)
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading
  }

  function logoutUser() {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    Cookies.remove('isLoggedIn')
    Cookies.remove('user')
    Cookies.remove('view_permissions')
  }

  function getCookies() {
    return Cookies.get()
  }

  return {
    cookies: Cookies,
    loading,
    permissions,

    getCookies,
    setViewPermissions,
    logoutUser,
    setUser,
    getUser,
    setAccessToken,
    setRefreshToken,
    setLoading,
    getAndSavePermissions,
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot))
}
