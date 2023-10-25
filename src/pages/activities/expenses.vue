<route lang="yaml">
meta:
  name: "expense"
</route>

<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

import { tables } from '/@src/utils/app'

const endpointUrl = API_URLs.ACTIVITIES__TIME_ENTRIES
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  tables.FetchAndGroupDependencies(
    componentDependencies,
    'ActivitiesTimeEntries',
    renderLoading,
    endpointUrl
  )
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Activities Expenses')

useHead({
  title: 'Lex Algeria - Activities Expenses',
})
</script>


<template>
  <GeneratedComponentContent
    :component-dependencies="componentDependencies"
    :render-loading="renderLoading"
  />
</template>