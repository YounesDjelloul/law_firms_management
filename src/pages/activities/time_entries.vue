<route lang="yaml">
meta:
  name: "timeentry"
</route>

<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'

import { tables } from '/@src/utils/app'
import { useHandleTimeEntries } from '/@src/stores/handleTimeEntries'

const handleComponent = useHandleCurrentComponent()
const handleTimeEntries = useHandleTimeEntries()

const endpointUrl = API_URLs.ACTIVITIES__TIME_ENTRIES
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(async () => {
  await tables.FetchAndGroupDependencies(
    componentDependencies,
    'ActivitiesTimeEntries',
    renderLoading,
    endpointUrl
  )
})

watchEffect(async () => {
  if (!renderLoading.value) {
    handleComponent.currentPageDependencies = componentDependencies
    await handleComponent.generatePageDependencies()
  }
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Activities Time Entries')

useHead({
  title: 'Lex Algeria - Activities Time Entries',
})
</script>

<template>
  <div class="page-content-inner">
    <div class="column is-12">
      <LoaderContainerComponent :render-loading="renderLoading">
        <TimeEntryComponent />
      </LoaderContainerComponent>
    </div>
  </div>
</template>
