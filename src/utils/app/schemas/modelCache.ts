import {
  formatCreateSchema,
  formatUpdateSchema,
  formatSortSchema,
  formatColumnListingSchema,
  formatCustomFields,
} from '../formatting/helpers'

import { saveSchematoStorage } from '../shared/helpers'
import { getPrioritizedUpdateMethod } from '../forms/helpers'

export async function useModelSchemas(
  endpointUrl: string,
  SchemasRequestFunction,
  modelName
) {
  let result = {
    createSchema: undefined,
    updateSchema: undefined,
    filtersSchema: undefined,
    sortingSchema: undefined,
    updateAllowedMethod: undefined,
    lookupField: undefined,
    listingColumns: undefined,
    model_permissions: undefined,
  }

  if (Object.values(result).includes(undefined)) {
    const {
      actions,
      filtering_schema,
      ordering_schema,
      lookup_field,
      listing_columns,
      model_permissions,
      custom_fields,
    } = await SchemasRequestFunction(endpointUrl)

    const allowedMethod = getPrioritizedUpdateMethod(actions ?? '')

    const createSchema = formatCreateSchema(actions.POST)
    const updateSchema = formatUpdateSchema(
      allowedMethod == 'put' ? actions.PUT : actions.PATCH
    )

    if (custom_fields.length > 0) {
      createSchema.custom = {
        name: 'Custom fields',
        collapsed: false,
        form: formatCustomFields(custom_fields),
      }

      updateSchema.custom = {
        name: 'Custom fields',
        collapsed: false,
        form: formatCustomFields(custom_fields),
      }
    }

    result = {
      createSchema,
      updateSchema,
      filtersSchema: formatCreateSchema(filtering_schema ?? []),
      sortingSchema: formatSortSchema(ordering_schema ?? []),
      updateAllowedMethod: allowedMethod,
      lookupField: lookup_field,
      listingColumns: formatColumnListingSchema(listing_columns ?? []),
      model_permissions: model_permissions,
    }

    saveSchematoStorage(`create${modelName}Schema`, JSON.stringify(result.createSchema))
    saveSchematoStorage(`update${modelName}Schema`, JSON.stringify(result.updateSchema))
    saveSchematoStorage(`filters${modelName}Schema`, JSON.stringify(result.filtersSchema))
    saveSchematoStorage(`sorting${modelName}Schema`, JSON.stringify(result.sortingSchema))
  }

  return result
}
