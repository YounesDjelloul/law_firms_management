<route lang="yaml">
meta:
  name: "offeredservice"
</route>
		
<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

import { tables } from '/@src/utils/app'

const endpointUrl = API_URLs.OFFERED_SERVICES
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  tables.FetchAndGroupDependencies(
    componentDependencies,
    'OfferedServices',
    renderLoading,
    endpointUrl
  )
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Offered Services')

useHead({
  title: 'Lex Algeria - Offered Services',
})
</script>
		
<template>
  <GeneratedComponentContent
    :component-dependencies="componentDependencies"
    :render-loading="renderLoading"
  />
</template>