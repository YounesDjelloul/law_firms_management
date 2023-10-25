import API_URLs from '/@src/constants/api/urls'
import { models } from '/@src/services/api'

export const fetchAssignGroupsSchemas = async (
  componentDependencies: object,
  renderLoading: boolean
) => {
  const rowsSchema = {
    endpoint_url: API_URLs.USERS,
  }

  const columnsSchema = {
    endpoint_url: API_URLs.GROUPS,
  }

  try {
    componentDependencies.tableRows = await getTableRows(rowsSchema)
    componentDependencies.tableColumns = await getTableColumns(columnsSchema)
    componentDependencies.rowsHeader = 'Users'
    componentDependencies.keyPath = 'assign_groups'
  } finally {
    renderLoading.value = false
  }
}

export const getTableRows = async (rowsSchema: object) => {
  const data = await models.getFieldChoices(rowsSchema.endpoint_url, '')
  return data
}

export const getTableColumns = async (columnsSchema: object) => {
  const data = await models.getFieldChoices(columnsSchema.endpoint_url, '')
  return data
}
