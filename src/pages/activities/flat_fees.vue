<route lang="yaml">
meta:
  name: "flatfee"
</route>

<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

import { tables } from '/@src/utils/app'

const endpointUrl = API_URLs.ACTIVITIES__FLAT_FEES
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  tables.FetchAndGroupDependencies(
    componentDependencies,
    'ActivitiesFlatFees',
    renderLoading,
    endpointUrl
  )
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Activities Flat Fees')

useHead({
  title: 'Lex Algeria - Activities Flat Fees',
})
</script>

<template>
  <GeneratedComponentContent
    :component-dependencies="componentDependencies"
    :render-loading="renderLoading"
  />
</template>