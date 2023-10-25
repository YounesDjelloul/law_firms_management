import { useApi } from '/@src/composable/useApi'
import API_URLs from '/@src/constants/api/urls'
import { assignGroupsHelpers } from '../index'

const api = useApi()

export const fetchAssignPermissionsSchemas = async (
  componentDependencies: object,
  renderLoading: boolean
) => {
  const rowsSchema = {
    endpoint_url: API_URLs.GROUPS,
  }

  const columnsSchema = {
    id: 'permission_ids',
    endpoint_url: API_URLs.PERMISSIONS,
  }

  componentDependencies.rowsSchema = rowsSchema
  componentDependencies.columnsSchema = columnsSchema
  componentDependencies.keyPath = 'assign_permissions'
  componentDependencies.groups = await assignGroupsHelpers.getTableRows(rowsSchema)

  const valuesToSubmit = reactive({})

  try {
    for (const row of componentDependencies.groups) {
      valuesToSubmit[row.id] = await getGroupPermissions(rowsSchema, row.id)
    }

    componentDependencies.valuesToSubmit = valuesToSubmit
  } finally {
    renderLoading.value = false
  }
}

export const getTableColumns = async (columnsSchema: object, currentPage) => {
  const { data } = await api.get(`${columnsSchema.endpoint_url}?page=${currentPage}`)
  return data
}

export const getGroupPermissions = async (rowsSchema, groupId) => {
  const { data } = await api.get(`${rowsSchema.endpoint_url}${groupId}/permissions/`)
  const permissions = new Set()

  data.forEach((permissionObject) => {
    permissions.add(permissionObject.id)
  })
  return permissions
}

export const searchPermissions = async (columnsSchema, searchKeyword) => {
  const { data } = await api.get(`${columnsSchema.endpoint_url}?search=${searchKeyword}`)
  return data
}
