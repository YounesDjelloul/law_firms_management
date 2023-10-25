<route lang="yaml">
    meta:
        name: "user"
</route>

<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

import { tables } from '/@src/utils/app'

const endpointUrl = API_URLs.USERS
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  tables.FetchAndGroupDependencies(
    componentDependencies,
    'Users',
    renderLoading,
    endpointUrl
  )
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Users')

useHead({
  title: 'Lex Algeria - Users',
})
</script>
  
<template>
  <GeneratedComponentContent
    :component-dependencies="componentDependencies"
    :render-loading="renderLoading"
  />
</template>