import { acceptHMRUpdate, defineStore } from 'pinia'
import { useUserSession } from '/@src/stores/userSession'
import { auth } from '../services/api'
import { shared } from '../utils/app'
import APP_URLs from '../constants/app/urls'

export const useHandleError = defineStore('handleError', () => {
  const { cookies, logoutUser } = useUserSession()
  const errorTitle = ref('')
  const errorDetails = ref('')
  const currentStatus = ref(0)

  const handle401Error = async (router) => {
    const refreshTokenCheck =
      cookies.get('refresh_token') !== '' &&
      cookies.get('refresh_token') &&
      cookies.get('refresh_token') !== 'undefined'
        ? true
        : false

    if (refreshTokenCheck) {
      try {
        await auth.newAccessToken()
      } catch (error) {
        if (error.status === 400) {
          logoutUser()
          await shared.sleep(1300)
          const redirectionUrl = router.options.history.state.current
          router.push({
            path: APP_URLs.LOGIN,
            query: { redirect: redirectionUrl ?? undefined },
          })
        }
      }
    } else {
      logoutUser()
      const redirectionUrl = router.options.history.state.current
      await shared.sleep(1300)
      router.push({
        path: APP_URLs.LOGIN,
        query: { redirect: redirectionUrl ?? undefined },
      })
    }
  }

  const setError = async (errorContent: string, status?: number, router?) => {
    currentStatus.value = status || 0

    let titleResult: string = status ? '' : errorContent
    let detailsResult: string = status ? '' : errorContent

    if (status) {
      switch (status) {
        case 404:
          titleResult = 'Resourse Not Found'
          detailsResult =
            "We're sorry, but the page you are looking for could not be found. It may have been moved, deleted, or never existed in the first place."
          break
        case 500:
          titleResult = 'Internal Server Error'
          detailsResult =
            "Oops! Something's not quite right on our end. Our team is on it. Please check back soon."
          break
        case 401:
          titleResult = 'Session Expired'
          detailsResult = 'Session Expired! You will be redirected to login.'
          handle401Error(router)
          break
        case 400:
          break
        default:
          titleResult = 'Error has occured, please try again later'
          detailsResult =
            'Something unexpected has occurred in the digital realm. Our engineers have been notified, and they are diligently working to resolve the issue. We appreciate your patience.'
      }
    }

    errorTitle.value = titleResult
    errorDetails.value = detailsResult
  }

  const clearError = () => {
    errorTitle.value = ''
    errorDetails.value = ''
    currentStatus.value = 0
  }

  return { setError, clearError, errorTitle, errorDetails, currentStatus }
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHandleError, import.meta.hot))
}
