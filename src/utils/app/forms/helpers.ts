import { useFieldSelect } from '/@src/stores/fieldTypeSelect'
import { z as zod } from 'zod'

import { models } from '/@src/services/api'
import { tables, shared, formatting } from '/@src/utils/app'

export async function generateAndAssignDataObjectToStore(
  initialValues: object,
  formSchema: object,
  modalName: string,
  deep = false
) {
  const fieldSelect = useFieldSelect()

  const getSelectedItemsForSingleSelect = async (
    fieldSchema,
    currentValue,
    currentObject
  ) => {
    const detailsResponse = await models.getEndpointInstanceDetails(
      fieldSchema.endpoint_url,
      currentValue
    )

    currentObject.selectedItem.push({
      value: detailsResponse.id,
      display_name: detailsResponse.str_representation,
    })

    currentObject.toSubmitValues = detailsResponse.id
    currentObject.typed = detailsResponse.str_representation
  }

  const getSelectedItemsForMultipleSelect = async (
    fieldSchema,
    currentValue,
    currentObject
  ) => {
    for (const onePk of currentValue) {
      const detailsResponse = await models.getEndpointInstanceDetails(
        fieldSchema.endpoint_url,
        onePk
      )
      currentObject.selectedItem.push({
        value: detailsResponse.id,
        display_name: detailsResponse.str_representation,
      })
      currentObject.toSubmitValues.push(detailsResponse.id)
    }
  }

  const callEndpointDependencies = async (fieldSchema, currentObject) => {
    try {
      const currentEndpointDependencies = {}
      const renderLoading = ref()

      await tables.FetchAndGroupDependencies(
        currentEndpointDependencies,
        fieldSchema.label,
        renderLoading,
        fieldSchema.endpoint_url
      )

      currentObject['createSchema'] = currentEndpointDependencies.createModelSchema
      currentObject['permissions'] = await tables.getAddUpdateDeletePermissions(
        currentEndpointDependencies.permissions
      )

      if (deep) {
        currentObject.options = formatting.formatFieldChoices(
          await models.getFieldChoices(fieldSchema.endpoint_url, '')
        )

        currentObject['updateSchema'] = currentEndpointDependencies.updateModelSchema
        currentObject['updateAllowedMethod'] = currentEndpointDependencies.updateMethod
      }
    } catch (err) {
      console.log(err)
    }
  }

  const fieldsTypeData = reactive({})
  const flattendInitialValues = shared.flattenObj(initialValues)

  for (const groupName in formSchema) {
    const group = formSchema[groupName]

    for (const fieldSchema of group.form) {
      if (fieldSchema.type !== 'field') {
        continue
      }

      const currentObject = {
        isOpen: false,
        typed: '',
        options: [],
        selectedItem: [],
        toSubmitValues: fieldSchema.relationship === 'many_to_many' ? [] : null,
        createSchema: [],
      }
      const currentValue = flattendInitialValues[fieldSchema.id] ?? ''

      try {
        if (typeof currentValue == 'number') {
          getSelectedItemsForSingleSelect(fieldSchema, currentValue, currentObject)
        } else if (Array.isArray(currentValue)) {
          getSelectedItemsForMultipleSelect(fieldSchema, currentValue, currentObject)
        }

        await callEndpointDependencies(fieldSchema, currentObject)
      } finally {
        fieldsTypeData[fieldSchema.id] = currentObject
      }
    }

    fieldSelect.setData({ [modalName]: fieldsTypeData })
  }
}

export function cleanObjectForEmptyValues(valuesObject: object) {
  for (const fieldName in valuesObject) {
    const fieldValue = valuesObject[fieldName]

    if (typeof fieldValue === 'object' && fieldValue !== null) {
      cleanObjectForEmptyValues(fieldValue)
      if (Object.keys(fieldValue).length === 0) {
        delete valuesObject[fieldName]
      }
    } else {
      if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
        delete valuesObject[fieldName]
      }
    }
  }
}

export function cleanValuesIfPatch(values, updateAllowedMethod, instanceValues) {
  if (updateAllowedMethod == 'put') {
    return values
  }

  const flattendValues = shared.flattenObj(values)
  const flattendInstanceValues = shared.flattenObj(instanceValues)
  const nestedResult = {}

  for (const valueKey in flattendValues) {
    const value = flattendValues[valueKey]

    if (JSON.stringify(value) !== JSON.stringify(flattendInstanceValues[valueKey])) {
      nestedResult[valueKey] = value
    }
  }

  const result = {}

  function recurse(nesting, val) {
    const lastKey = nesting.pop()
    const lastObj = nesting.reduce(
      (result, key) => (result[key] = result[key] || {}),
      result
    )

    lastObj[lastKey] = val
  }

  for (const one in nestedResult) {
    const nesting = one.split('.')
    recurse(nesting, nestedResult[one])
  }

  return result
}

export function getPrioritizedUpdateMethod(actions: object) {
  return actions.PUT ? 'put' : 'patch'
}

export function generateInitialValues(schema: object, instance: object = {}) {
  const result = {}

  function recurse(nesting, val) {
    const lastKey = nesting.pop()
    const lastObj = nesting.reduce(
      (result, key) => (result[key] = result[key] || {}),
      result
    )

    lastObj[lastKey] = val
  }

  const flattendInstance = shared.flattenObj(instance)

  for (const groupName in schema) {
    const group = schema[groupName]

    for (const field of group.form) {
      const fieldValues = {
        'image upload': null,
        boolean: false,
        many_to_many: [],
        '': null,
        string: '',
        choice: '',
        email: '',
        url: '',
        list: [],
      }

      let fieldType = field.type

      if (fieldType === 'field') {
        fieldType = field.drf_type
      }

      const currentValue = flattendInstance[field.id] ?? fieldValues[fieldType]

      if (field.id.includes('.')) {
        const nesting = field.id.split('.')
        recurse(nesting, currentValue)
        continue
      }

      result[field.name] = currentValue
    }
  }

  return result
}

export function generateValidationSchema(formSchema: object) {
  const zodFunctionsRepo = {
    string: zod.string(),
    choice: zod.coerce.string(),
    list: zod.array(zod.coerce.string()),
    email: zod.string(),
    'image upload': zod.any(),
    array: zod.array(zod.number()),
    boolean: zod.coerce.boolean(),
    nullableNumber: zod.union([zod.null(), zod.number()]),
    number: zod.coerce.number(),
    integer: zod.coerce.number().int(),
    decimal: zod.coerce.number(),
    url: zod.string(),
    date: zod.coerce.string(),
  }

  function getZodField(fieldProp: string) {
    let fieldType = fieldProp.type

    if (fieldType === 'field') {
      if (fieldProp.drf_type === 'many_to_many') {
        fieldType = 'array'
      } else if (fieldProp.drf_type !== 'many_to_many') {
        fieldType = fieldProp.required ? 'number' : 'nullableNumber'
      }
    }

    let zodField = zodFunctionsRepo[fieldType] ?? zod.string()

    if (fieldProp.required) {
      zodField = zodField.min(1, { message: 'This field is required' })
    } else {
      zodField = zodField.optional()
    }

    return zodField
  }

  let result = zod.object({})

  function handleNestedFields(nesting, fieldProp) {
    const zodField = getZodField(fieldProp)

    let SchemaCopy = result
    const record = {}

    for (let ind = 0; ind < nesting.length; ind++) {
      const part = nesting[ind]

      if (ind == nesting.length - 1) {
        SchemaCopy = SchemaCopy.extend({ [part]: zodField })
      }

      if (SchemaCopy.shape[part] == undefined) {
        SchemaCopy = SchemaCopy.extend({ [part]: zod.object({}) })
      }

      record[part] = SchemaCopy.shape[part]
      SchemaCopy = SchemaCopy.shape[part]
    }

    const props = Object.keys(record).reverse()

    for (let i = 0; i < props.length; i++) {
      const currentZodName = props[i]
      const nextZodName = props[i + 1]

      if (i == props.length - 1) {
        result = result.extend({ [currentZodName]: record[currentZodName] })
        continue
      }

      record[nextZodName] = record[nextZodName].extend({
        [currentZodName]: record[currentZodName],
      })
    }
  }

  for (const groupName in formSchema) {
    const group = formSchema[groupName]

    for (const fieldProp of group.form) {
      const fieldId = fieldProp.id

      const nesting = fieldId.split('.')
      handleNestedFields(nesting, fieldProp)
    }
  }

  return result
}

export function checkIfFileFieldExist(formSchema) {
  for (const field of formSchema) {
    if (field.html_input_type === 'file') {
      return true
    }
  }

  return false
}
