export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const flattenObj = (ob) => {
  const result = {}

  for (const i in ob) {
    if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i])
      for (const j in temp) {
        result[i + '.' + j] = temp[j]
      }
    } else {
      result[i] = ob[i]
    }
  }
  return result
}

export function saveSchematoStorage(actionKey: string, formSchema: string) {
  localStorage.setItem(actionKey, formSchema)
}

export function objectPop(propertyName: string, userDetailsObject: object) {
  const propertyValue: string = userDetailsObject[propertyName]
  delete userDetailsObject[propertyName]

  return propertyValue
}

export function arrayPop(propertyName: string, formSchema: object) {
  let targetProp = undefined

  for (const i in formSchema) {
    const fieldProp = formSchema[i]

    if (fieldProp.name == propertyName) {
      formSchema.splice(i, 1)
      targetProp = fieldProp
      break
    }
  }

  return targetProp
}
