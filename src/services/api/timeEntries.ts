import { useApi } from '/@src/composable/useApi'

const api = useApi()

export async function toggleTimeEntryCall(endpointUrl: string, instancePk: string) {
  await api.patch(`${endpointUrl}${instancePk}/toggle_counter/`)
}
