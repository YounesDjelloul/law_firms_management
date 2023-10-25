import { models, users } from '/@src/services/api'
import { useModelSchemas } from '../schemas/modelCache'
import { useQueryParam } from '/@src/stores/queryParam'

export function getValueFromNestedObject(fieldProps: object, path: string) {
  const nesting = path.split('.')
  let result = fieldProps

  for (const one of nesting) {
    if (!result) return null
    result = result[one]
  }

  return result
}

export const FetchAndGroupDependencies = async (
  componentDependencies: object,
  modelName: string,
  renderLoading,
  endpointUrl: string
) => {
  try {
    const {
      createSchema,
      updateSchema,
      filtersSchema,
      sortingSchema,
      updateAllowedMethod,
      lookupField,
      listingColumns,
      model_permissions,
    } = await useModelSchemas(endpointUrl, models.getInstanceSchemas, modelName)

    const headings = generateColumns(createSchema, sortingSchema, listingColumns)

    componentDependencies.renderLoading = renderLoading
    componentDependencies.modelName = modelName
    componentDependencies.createModelSchema = createSchema
    componentDependencies.updateModelSchema = updateSchema
    componentDependencies.filtersModelSchema = filtersSchema
    componentDependencies.updateMethod = updateAllowedMethod
    componentDependencies.modelPk =
      lookupField == 'pk' ? 'id' : lookupField?.replace('__', '.')
    componentDependencies.headings = headings
    componentDependencies.permissions = model_permissions
  } finally {
    renderLoading.value = false
  }
}

export const InvoicesDependencyGenerator = async (
  componentDependencies: object,
  modelName: string,
  endpointUrl
) => {
  try {
    const { createSchema, lookupField } = await useModelSchemas(
      endpointUrl,
      models.getInstanceSchemas,
      modelName
    )

    componentDependencies.modelPk = lookupField
    componentDependencies.overAllSchema = createSchema

    splitCreateSchemaFields(componentDependencies, createSchema)
  } finally {
    console.log(endpointUrl)
  }
}

export const splitCreateSchemaFields = (componentDependencies, createSchema) => {
  for (const groupName in createSchema) {
    const group = createSchema[groupName]

    for (const field of group.form) {
      if (field.type === 'field') {
        componentDependencies.tableFieldsSchema.general.form.push(field)
      } else {
        componentDependencies.normalFieldsSchema.general.form.push(field)
      }
    }
  }
}

export const getSortQuery = () => {
  const queryParam = useQueryParam()

  const { sort } = queryParam
  return sort.split(':')
}

export const sortData = (e) => {
  const queryParam = useQueryParam()

  const currentSort = getSortQuery()
  const [sortedField, oldDirection] = currentSort

  const element = e.currentTarget.__vnode
  const fieldName = element.props.key
  const sortable = element.props.sortable
  let newDirection

  if (sortedField == fieldName) {
    newDirection = oldDirection == 'asc' ? 'desc' : 'asc'
  } else {
    newDirection = 'asc'
  }

  if (sortable) {
    queryParam.sort = `${fieldName}:${newDirection}`
  }
}

export const getAddUpdateDeletePermissions = async (permissions: []) => {
  const commingPermissions = await users.getUserPermissions()
  const allPermissions = commingPermissions.map((item) => item.codename)
  const formattedPermissions: [] = []

  permissions.forEach((permission: string) => {
    const current = permission.split('.')[1]
    if (allPermissions.includes(current)) {
      formattedPermissions.push(permission.split('.')[1].split('_')[0])
    }
  })

  const toAdd = computed(() => {
    return formattedPermissions.includes('add')
  })

  const toChange = computed(() => {
    return formattedPermissions.includes('change')
  })

  const toDelete = computed(() => {
    return formattedPermissions.includes('delete')
  })

  return { toAdd, toChange, toDelete }
}

export function generateColumns(formSchema, sortingSchema, toShow) {
  const mediaFields = []
  const headings = []

  for (const groupName in formSchema) {
    const group = formSchema[groupName]

    for (const one of group.form) {
      if (one.type === 'image upload') {
        mediaFields.push(one.id)
      }
    }
  }

  for (const field of toShow) {
    const orderable = sortingSchema.has(field.dotValue)
    const isMedia = mediaFields.includes(field.dotValue)

    const currentObj = {
      orderable: orderable,
      data: field.dotValue,
      display_name: field.display_name,
      key: field.value,
      media: isMedia,
    }

    headings.push(currentObj)
  }

  const currentObj = {
    orderable: false,
    data: 'Actions',
    display_name: 'Actions',
  }

  headings.push(currentObj)

  return headings
}

export function deleteCurrentInstance(instance: object) {
  return instance != this
}

export function getRowPk(row, modelPk) {
  modelPk = modelPk === 'pk' ? 'id' : modelPk

  const flattendRow = flattenObj(row)
  return flattendRow[modelPk.replaceAll('__', '.')]
}

export function updateCurrentInstance(instance: object, instanceIndex: number, data: []) {
  const oldInstance = this[0]
  const instanceData = this[1]

  if (instance == oldInstance) {
    data[instanceIndex] = instanceData
    return
  }
}
