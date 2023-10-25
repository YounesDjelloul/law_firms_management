import { acceptHMRUpdate, defineStore } from 'pinia'
import API_URLs from '/@src/constants/api/urls'

import { useHandleCurrentComponent } from './handleCurrentComponent'

import { tables, timeEntriesHelpers, forms } from '/@src/utils/app'
import { models, timeEntries } from '/@src/services/api'

import { useNotyf } from '/@src/composable/useNotyf'
import sleep from '../utils/sleep'
import { useFieldSelect } from './fieldTypeSelect'

const notyf = useNotyf()

export const useHandleTimeEntries = defineStore('handleTimeEntries', () => {
  const handleComponent = useHandleCurrentComponent()
  const fieldSelect = useFieldSelect()

  const loadingTimeEntry = ref()

  const isLoading = ref(true)
  const endpointUrl = API_URLs.ACTIVITIES__TIME_ENTRIES
  const currentEndpointRoute = ref('')

  const showCreateTimeEntryPopup = ref(false)
  const timeEntryDependencies = reactive({})

  const allTimeEntries = ref()
  const allLength = ref()

  const runningTimeEntries = ref([])
  const runningLength = computed(() => runningTimeEntries.value.length)

  const firstRecord = computed(() => runningTimeEntries.value[0])

  async function fetchRecords() {
    isLoading.value = true

    let defaultData = handleComponent.currentStateData
    let defaultLength = handleComponent.dataLength

    if (handleComponent.currentPageDependencies.modelName !== 'ActivitiesTimeEntries') {
      const { results, count } = await models.getInstances(
        endpointUrl,
        currentEndpointRoute.value
      )

      defaultData = results
      defaultLength = count
    }

    allTimeEntries.value = defaultData
    allLength.value = defaultLength

    if (Object.keys(timeEntryDependencies).length == 0) {
      await getTimeEntriesDependencies()
    }

    updateRunningTimeEntries()
    isLoading.value = false
  }

  async function getTimeEntriesDependencies() {
    const renderLoading = ref(true)

    await tables.FetchAndGroupDependencies(
      timeEntryDependencies,
      'ActivitiesTimeEntries',
      renderLoading,
      endpointUrl
    )

    timeEntryDependencies.initialValues = forms.generateInitialValues(
      timeEntryDependencies.createModelSchema
    )
    timeEntryDependencies.validationSchema = forms.generateValidationSchema(
      timeEntryDependencies.createModelSchema
    )

    await forms.generateAndAssignDataObjectToStore(
      timeEntryDependencies.initialValues,
      timeEntryDependencies.createModelSchema,
      'time entry'
    )
  }

  async function createAndStartTimeEntryAffect() {
    await fetchRecords()

    notyf.dismissAll()
    notyf.success('Time Entry Started Successfully!')
  }

  function updateRunningTimeEntries() {
    const currentRunning = allTimeEntries.value.filter((item: object) => item.is_counting)

    const notIncluded = runningTimeEntries.value.filter((item: object) => {
      return allTimeEntries.value.includes(item) == false
    })

    const hold = notIncluded.concat(currentRunning)
    runningTimeEntries.value = [
      ...new Map(hold.map((item) => [item['id'], item])).values(),
    ]
  }

  async function toggleTimeEntryCounter(instanceData: object) {
    try {
      loadingTimeEntry.value = instanceData
      isLoading.value = true
      await sleep(300)

      const notificationMessage: string =
        timeEntriesHelpers.toggleTimeEntryLocally(instanceData)
      await timeEntries.toggleTimeEntryCall(
        endpointUrl,
        Number.parseInt(instanceData.id as string)
      )

      notyf.dismissAll()
      notyf.success(notificationMessage)
    } catch (err) {
      console.log(err)
      notyf.dismissAll()
      notyf.error('Error occured! please try again later')
    } finally {
      handleComponent.isLoading = false
      isLoading.value = false
    }
  }

  window.setInterval(() => {
    timeEntriesHelpers.IncrementListedRunningInstances()
  }, 1000)

  return {
    fetchRecords,
    toggleTimeEntryCounter,
    updateRunningTimeEntries,
    createAndStartTimeEntryAffect,

    loadingTimeEntry,
    firstRecord,
    allTimeEntries,
    allLength,
    runningLength,
    runningTimeEntries,
    isLoading,
    showCreateTimeEntryPopup,
    timeEntryDependencies,
    endpointUrl,
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
  import.meta.hot.accept(acceptHMRUpdate(useHandleTimeEntries, import.meta.hot))
}
