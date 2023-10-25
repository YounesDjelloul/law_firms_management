<route lang="yaml">
  meta:
    name: "jobtitle"
  </route>

<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

import { tables } from '/@src/utils/app'

const endpointUrl = API_URLs.JOB_TITLES
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  tables.FetchAndGroupDependencies(
    componentDependencies,
    'JobTitles',
    renderLoading,
    endpointUrl
  )
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Job Titles')

useHead({
  title: 'Lex Algeria - Job Titles',
})
</script>

<template>
  <GeneratedComponentContent
    :component-dependencies="componentDependencies"
    :render-loading="renderLoading"
  />
</template>