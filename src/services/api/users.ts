import { useApi } from '/@src/composable/useApi'
import API_URLs from '/@src/constants/api/urls'
import { useUserSession } from '/@src/stores/userSession'
import { formatting } from '/@src/utils/app'

const api = useApi()

export async function getUserDetails() {
  const { data } = await api.get(API_URLs.CURRENT_USER_PROFILE)
  return data
}

export async function getUpdateUserSchema() {
  const { data } = await api.options(API_URLs.CURRENT_USER_PROFILE)
  return data
}

export async function updateUserDetails(body: object) {
  const { data } = await api.patch(API_URLs.CURRENT_USER_PROFILE, body)
  return data
}

export async function getUserPermissions() {
  const { data } = await api.get(API_URLs.CURRENT_USER_PERMISSIONS)
  return data
}

export async function setUserProfile() {
  const userSession = useUserSession()

  const { data: userDetails } = await api.get(API_URLs.CURRENT_USER_PROFILE)
  userSession.setUser(userDetails)
}

export async function getSignupSchema() {
  const { data } = await api.options(API_URLs.REGISTRATION)
  return data.actions.POST
}

export async function getFormattedUpdateUserSchema() {
  const { actions: actions } = await getUpdateUserSchema()
  return formatting.formatUpdateSchema(actions.PATCH)
}
