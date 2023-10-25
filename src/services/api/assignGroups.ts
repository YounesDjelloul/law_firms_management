import { useApi } from '/@src/composable/useApi'

const api = useApi()

export async function assignGroupsCall(pk, callBody, endpoint_url, keyPath) {
  const { data: data } = await api.patch(`${endpoint_url}${pk}/${keyPath}/`, callBody)
  return data
}
