import { acceptHMRUpdate, defineStore } from 'pinia'
import { models } from '/@src/services/api'
import { formatting } from '/@src/utils/app'
import { useNotyf } from '/@src/composable/useNotyf'

export const useFieldSelect = defineStore('fieldTypeSelect', () => {
  const { success } = useNotyf()

  const fieldsTypeData = ref()
  const fieldOptionsLoading = ref(false)
  const showCreatePopup = ref(false)
  const showUpdatePopup = ref(false)

  const clearSelectedValueForOne = (schemaField, setFieldValue, modalName) => {
    const currentModalData = fieldsTypeData.value[modalName]

    currentModalData[schemaField.id].toSubmitValues = null
    currentModalData[schemaField.id].selectedItem = []

    setFieldValue(schemaField.id, currentModalData[schemaField.id].toSubmitValues)
  }

  const checkValuesDuplication = (selection, item) => {
    for (const one of selection) {
      if (JSON.stringify(one) === JSON.stringify(item)) {
        return true
      }
    }

    return false
  }

  const setFieldChoices = async (schemaField, modalName) => {
    const currentModalData = fieldsTypeData.value[modalName]
    const searchTerm = ''
    try {
      fieldOptionsLoading.value = true
      currentModalData[schemaField.id].options = formatting.formatFieldChoices(
        await models.getFieldChoices(schemaField.endpoint_url, searchTerm)
      )
    } finally {
      fieldOptionsLoading.value = false
    }
  }

  const filteredItems = async (event, schemaField, setFieldValue, modalName) => {
    const currentModalData = fieldsTypeData.value[modalName]
    const searchTerm = event.target.value

    if (schemaField.relationship !== 'many_to_many') {
      clearSelectedValueForOne(schemaField, setFieldValue, modalName)
    }

    fieldOptionsLoading.value = true
    try {
      currentModalData[schemaField.id].options = formatting.formatFieldChoices(
        await models.getFieldChoices(schemaField.endpoint_url, searchTerm)
      )
    } finally {
      fieldOptionsLoading.value = false
    }
  }

  const clearSelection = (modalName: string) => {
    const currentModalData = fieldsTypeData.value[modalName]

    for (const modalIndex in fieldsTypeData.value) {
      const modalDetails = currentModalData[modalIndex]

      for (const fieldIndex in modalDetails) {
        const fieldDetails = modalDetails[fieldIndex]

        fieldDetails.selectedItem = []
        fieldDetails.typed = ''
        fieldDetails.isOpen = false

        if (Array.isArray(fieldDetails.toSubmitValues)) {
          fieldDetails.toSubmitValues = []
        } else {
          fieldDetails.toSubmitValues = null
        }
      }
    }
  }

  const selectItem = (item, schemaField, setFieldValue, multiple, modalName) => {
    const currentModalData = fieldsTypeData.value[modalName]

    const currentSelection = currentModalData[schemaField.id].selectedItem
    const duplicationCheckResult = checkValuesDuplication(currentSelection, item)

    if (!duplicationCheckResult) {
      currentModalData[schemaField.id].typed = item.display_name

      if (multiple) {
        currentModalData[schemaField.id].selectedItem.push(item)
        currentModalData[schemaField.id].toSubmitValues.push(item.value)
      } else {
        currentModalData[schemaField.id].selectedItem = [item]
        currentModalData[schemaField.id].toSubmitValues = item.value
      }

      setFieldValue(schemaField.id, currentModalData[schemaField.id].toSubmitValues)
    }
  }

  const removeItem = (item, schemaField, setFieldValue, modalName) => {
    const currentModalData = fieldsTypeData.value[modalName]

    let currentSelection = currentModalData[schemaField.id].selectedItem
    let currentToSubmitValues = currentModalData[schemaField.id].toSubmitValues

    currentSelection = currentSelection.filter((selectedOption) => {
      return selectedOption !== item
    })

    currentToSubmitValues = currentToSubmitValues.filter((selectedOption) => {
      return selectedOption !== item.value
    })

    currentModalData[schemaField.id].selectedItem = currentSelection
    currentModalData[schemaField.id].toSubmitValues = currentToSubmitValues

    setFieldValue(schemaField.id, currentModalData[schemaField.id].toSubmitValues)
  }

  const toggleSelect = (schemaField, modalName) => {
    const currentModalData = fieldsTypeData.value[modalName]
    currentModalData[schemaField.id].isOpen = !currentModalData[schemaField.id].isOpen
  }

  const setData = (dataObj) => {
    fieldsTypeData.value = { ...dataObj, ...fieldsTypeData.value }
  }

  const handleNewOptionCreationAffect = (instance, id, modalName, optionLabel) => {
    const currentModalData = fieldsTypeData.value[modalName]

    currentModalData[id].options.push(...formatting.formatFieldChoices([instance]))
    showCreatePopup.value = false

    success(`${optionLabel} created successfully!`)
  }

  const handleUpdateOptionAffect = (instance, instanceId, fieldId, modalName) => {
    const currentModalData = fieldsTypeData.value[modalName]

    currentModalData[fieldId].options.forEach((currentOption, ind, arr) => {
      if (currentOption.value === instance.id) {
        arr[ind] = formatting.formatFieldChoices([instance])[0]
      }
    })

    showUpdatePopup.value = false

    success(`option updated successfully!`)
  }

  const toggleCreatePopup = () => {
    showCreatePopup.value = !showCreatePopup.value
  }

  const toggleUpdatePopup = () => {
    showUpdatePopup.value = !showUpdatePopup.value
  }

  const clearStore = () => {
    fieldsTypeData.value = {}
    fieldOptionsLoading.value = false
    showCreatePopup.value = false
    showUpdatePopup.value = false
  }

  return {
    setData,
    handleNewOptionCreationAffect,
    handleUpdateOptionAffect,
    clearStore,
    clearSelection,
    showCreatePopup,
    showUpdatePopup,
    toggleCreatePopup,
    toggleUpdatePopup,
    fieldsTypeData,
    fieldOptionsLoading,
    filteredItems,
    selectItem,
    toggleSelect,
    removeItem,
    setFieldChoices,
  }
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFieldSelect, import.meta.hot))
}
