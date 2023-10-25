import { useApi } from '/@src/composable/useApi'
import { useUserSession } from '/@src/stores/userSession'
import API_URLs from '/@src/constants/api/urls'

const api = useApi()

export async function newAccessToken() {
  const userSession = useUserSession()
  const body: object = { refresh: userSession.cookies.get('refresh_token') }

  const { data: data } = await api.post(API_URLs.NEW_ACCESS_TOKEN, body)
  userSession.setAccessToken(data.access)
}

export async function getUserDetails() {
  const userSession = useUserSession()

  const getUserDetailsRoute = API_URLs.CURRENT_USER_PROFILE
  const userDetails = await api.get(getUserDetailsRoute)

  userSession.setUser(userDetails.data)
}

export async function authenticateUser(credentials: object) {
  const userSession = useUserSession()

  const loginRoute: string = API_URLs.LOGIN
  const { data: data } = await api.post(loginRoute, credentials)

  await userSession.setAccessToken(data.access_token)
  userSession.setViewPermissions(data.authorised_views)
  userSession.setRefreshToken(data.refresh_token)
}

export async function registerUser(registrationObject: object) {
  const registerRoute: string = API_URLs.REGISTRATION
  await api.post(registerRoute, registrationObject)
}

export async function changeUserPassword(passwordsData: object) {
  const changePasswordRoute: string = API_URLs.PASSWORD__CHANGE
  return await api.post(changePasswordRoute, passwordsData)
}
