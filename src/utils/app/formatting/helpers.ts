export function convertObjectToFilterString(obj: object) {
  let result: string = ''

  for (const key in obj) {
    const currentValue = obj[key]

    if (!currentValue) {
      continue
    }

    result += `${key}=${currentValue}&`
  }

  return result.slice(0, -1)
}

export function FormatingOrderingParam(sortParam: string) {
  const [sort_field, order_value] = sortParam.split(':')

  if (order_value === 'desc') {
    return '-' + sort_field
  }

  return sort_field // Ascending case
}

export function formatFieldChoices(choicesObject: object) {
  const result = []

  for (const one of choicesObject) {
    const current = { value: one.id, display_name: one.str_representation }
    result.push(current)
  }

  return result
}

export function formatUserAvatarUrl(url: string) {
  if (!url) {
    return null
  }

  return url.replace(/^(?:\/\/|[^/]+)*\//, '')
}

export function formatSortSchema(orderingSchema) {
  const result = new Set()

  for (const field of orderingSchema) {
    if (field.value === null) {
      continue
    }

    const fieldId = field.value.replaceAll('__', '.')
    result.add(fieldId)
  }

  return result
}

export function formatColumnListingSchema(listingSchema) {
  const result = []

  for (const field of listingSchema) {
    if (field.value === null) {
      continue
    }

    field.dotValue = field.value.replaceAll('__', '.')
    result.push(field)
  }
  return result
}

export function formatView(instance: object) {
  const result = {}

  function recurse(currentValue: object) {
    for (const fieldName in currentValue) {
      const fieldValue = currentValue[fieldName]

      if (typeof fieldValue === 'object' && fieldValue !== null) {
        recurse(fieldValue)
        continue
      }

      result[fieldName] = fieldValue
    }
  }

  recurse(instance)
  return result
}

export function formatError(errorObject: object, parentKey = '') {
  const result = {}

  for (let key in errorObject) {
    if (errorObject.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key

      if (typeof errorObject[key] === 'object' && !Array.isArray(errorObject[key])) {
        const nestedFlattened = formatError(errorObject[key], newKey)
        Object.assign(result, nestedFlattened)
      } else {
        result[newKey] = errorObject[key]
      }
    }
  }

  return result
}

export function formatCustomFields(fullSchema: []) {
  for (const fieldProp of fullSchema) {
    fieldProp.model_id = fieldProp.id
    fieldProp.id = fieldProp.str_representation
  }

  return fullSchema
}

export function formatCreateSchema(fullSchema: object) {
  const result = { general: { name: 'general', collapsed: true, form: [] } }

  function recurse(fieldIdPrefix: string, group: string, obj: object) {
    for (const field in obj) {
      const fieldProp: object = obj[field]

      if (fieldProp.read_only) {
        continue
      }

      if (fieldProp.type === 'nested object') {
        let currentGroup: string = 'general'

        if (!fieldProp.required) {
          result[field] = { name: fieldProp.label, collapsed: false, form: [] }
          currentGroup = field
        }

        recurse(fieldIdPrefix + `${field}.`, currentGroup, fieldProp.children)
        continue
      }

      fieldProp['name'] = field
      fieldProp['id'] = fieldIdPrefix + field

      result[group].form.push(fieldProp)
    }
  }

  recurse('', 'general', fullSchema)

  for (const groupName in result) {
    const group = result[groupName]

    if (group.form.length == 0) {
      delete result[groupName]
    }
  }

  return result
}

export function formatUpdateSchema(fullSchema: object) {
  const result = { general: { name: 'general', collapsed: true, form: [] } }

  function recurse(fieldIdPrefix: string, group: string, obj: object) {
    for (const field in obj) {
      const fieldProp: object = obj[field]

      if (fieldProp.read_only) {
        continue
      }

      if (fieldProp.type === 'nested object') {
        let currentGroup: string = 'general'

        if (!fieldProp.required) {
          result[field] = { name: field, collapsed: false, form: [] }
          currentGroup = field
        }

        recurse(fieldIdPrefix + `${field}.`, currentGroup, fieldProp.children)
        continue
      }

      fieldProp['name'] = field
      fieldProp['id'] = fieldIdPrefix + field

      result[group].form.push(fieldProp)
    }
  }

  recurse('', 'general', fullSchema)
  return result
}

export function getFormattedTime(hours: number) {
  const totalSeconds = hours * 3600
  const hoursValue = Math.floor(totalSeconds / 3600)
  const minutesValue = Math.floor((totalSeconds % 3600) / 60)
  const secondsValue = Number.parseInt(totalSeconds % 60)

  const formattedTime =
    leadingZero(hoursValue) +
    ':' +
    leadingZero(minutesValue) +
    ':' +
    leadingZero(secondsValue)

  return formattedTime
}

function leadingZero(value: number) {
  return value < 10 ? '0' + value : value
}

export function convertFilterStringToObject(filterString?: string) {
  const fields: [] = filterString?.split('&') ?? ''

  const result = {}

  for (const field of fields) {
    const parts = field.split('=')

    result[parts[0]] = parts[1]
  }

  return result
}

export function formatCustomFieldsInValues(values: object, customFieldsForm: []) {
  const custom_values = []

  for (const fieldProp of customFieldsForm) {
    const { model_id, str_representation } = fieldProp

    if (str_representation in values) {
      const value = values[str_representation]
      delete values[str_representation]

      custom_values.push({ value, custom_field: model_id })

      values.custom_values = custom_values
    }
  }
}
