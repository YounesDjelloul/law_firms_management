import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotyf } from '/@src/composable/useNotyf'

import { tables, forms } from '/@src/utils/app'
import { models } from '/@src/services/api'

export const useHandleCurrentComponent = defineStore('handleCurrentComponent', () => {
  const { dismissAll, success } = useNotyf()

  const showCreateInstancePopup = ref(false)
  const showDeleteInstancePopup = ref(false)
  const showViewInstanceDetailsPopup = ref(false)
  const showUpdateInstancePopup = ref(false)
  const showFilterInstancesPopup = ref(false)
  const showFolderExplorerPopup = ref(false)

  const defaultQuery = ref('')

  const currentStateData = ref([])

  const currentModel = ref('')
  const operatedInstance = ref()
  const instanceToAct = ref()
  const isLoading = ref(true)
  const dataLength = ref(0)
  const itemPerPage = ref(20)

  interface DependenciesInterface {
    createModelSchema: []
    updateModelSchema: []
    createInitialValues: {}
    createValidationSchema: any
    updateValidationSchema: any
    endpointUrl: string
    renderLoading: boolean
    modelName: string
  }

  const currentPageDependencies = ref<DependenciesInterface>({
    createModelSchema: [],
    updateModelSchema: [],
    createInitialValues: {},
    createValidationSchema: undefined,
    updateValidationSchema: undefined,
    endpointUrl: '',
    renderLoading: true,
    modelName: '',
  })

  async function getRecords(query?: string) {
    isLoading.value = true
    defaultQuery.value = query ?? defaultQuery.value

    const { results, count } = await models.getInstances(
      currentPageDependencies.value.endpointUrl,
      defaultQuery.value
    )

    currentStateData.value = results
    dataLength.value = count

    isLoading.value = false
  }

  async function generatePageDependencies() {
    currentPageDependencies.value.createInitialValues = forms.generateInitialValues(
      currentPageDependencies.value.createModelSchema
    )
    currentPageDependencies.value.createValidationSchema = forms.generateValidationSchema(
      currentPageDependencies.value.createModelSchema
    )
    currentPageDependencies.value.updateValidationSchema = forms.generateValidationSchema(
      currentPageDependencies.value.updateModelSchema
    )
  }

  function getUpdateInstanceDetailsPopup(instance: string | number) {
    instanceToAct.value = instance
    showUpdateInstancePopup.value = true
  }

  function getCreateInstancePopup() {
    showCreateInstancePopup.value = true
  }

  async function getDeleteInstancePopup(instance: string | number) {
    instanceToAct.value = instance
    showDeleteInstancePopup.value = true
  }

  async function getViewInstanceDetailsPopup(instance: string | number) {
    instanceToAct.value = instance
    showViewInstanceDetailsPopup.value = true
  }

  function getFolderExplorerPopup(model: string) {
    currentModel.value = model
    showFolderExplorerPopup.value = true
  }

  function reload(operation: String) {
    switch (operation) {
      case 'delete':
        currentStateData.value = currentStateData.value.filter(
          tables.deleteCurrentInstance,
          instanceToAct.value
        )
        dataLength.value -= 1
        break
      case 'update':
        currentStateData.value.forEach(tables.updateCurrentInstance, [
          instanceToAct.value,
          operatedInstance.value,
        ])
        break
      case 'create':
        currentStateData.value.unshift(operatedInstance.value)
        dataLength.value += 1
        break
    }
  }

  function handleInstanceCreationAffect(data: object) {
    dismissAll()
    success(`${currentPageDependencies.value.modelName} record Created Successfully!`)

    showCreateInstancePopup.value = false
    operatedInstance.value = data
    reload('create')
  }

  function handleInstanceUpdateAffect(data: object) {
    dismissAll()
    success(`${currentPageDependencies.value.modelName} record updated successfully!`)

    showUpdateInstancePopup.value = false
    operatedInstance.value = data
    reload('update')
  }

  function handleInstanceDeleteAffect() {
    dismissAll()
    success(`${currentPageDependencies.value.modelName} record deleted successfully!`)

    showDeleteInstancePopup.value = false
    reload('delete')
  }

  const setStateData = (tableData: object) => {
    currentStateData.value = tableData
  }

  return {
    showCreateInstancePopup,
    showDeleteInstancePopup,
    showViewInstanceDetailsPopup,
    showUpdateInstancePopup,
    showFilterInstancesPopup,
    currentStateData,
    operatedInstance,
    instanceToAct,
    isLoading,
    dataLength,
    currentModel,
    showFolderExplorerPopup,
    itemPerPage,
    currentPageDependencies,

    getRecords,
    generatePageDependencies,
    handleInstanceDeleteAffect,
    handleInstanceUpdateAffect,
    handleInstanceCreationAffect,
    getViewInstanceDetailsPopup,
    getDeleteInstancePopup,
    getCreateInstancePopup,
    getUpdateInstanceDetailsPopup,
    getFolderExplorerPopup,
    setStateData,
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
  import.meta.hot.accept(acceptHMRUpdate(useHandleCurrentComponent, import.meta.hot))
}
