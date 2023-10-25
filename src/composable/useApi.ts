import axios, { type RawAxiosRequestHeaders, type AxiosInstance } from 'axios'

import { useUserSession } from '/@src/stores/userSession'
import { useHandleError } from '/@src/stores/handleError'
import API_URLs from '../constants/api/urls'

export function createApi() {
  let api: AxiosInstance

  api = axios.create({
    baseURL: API_URLs.BASE_URL,
  })

  api.interceptors.request.use((config) => {
    const userSession = useUserSession()
    const { access_token: accessToken, isLoggedIn } = userSession.getCookies()

    if (isLoggedIn) {
      config.headers = {
        ...((config.headers as RawAxiosRequestHeaders) ?? {}),
        Authorization: `Bearer ${accessToken}`,
      }
    }

    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const handleError = useHandleError()

      if (!error.response) {
        handleError.setError('Network error. Please check your connection.')
      } else {
        const { data, status } = error.response
        handleError.setError(data, status, handleError.router)
      }

      return Promise.reject(error)
    }
  )

  return api
}

export function useApi() {
  return createApi()
}
