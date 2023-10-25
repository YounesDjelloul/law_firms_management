<route lang="yaml">
  meta:
    name: "customfield"
</route>

<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useHandleError } from '/@src/stores/handleError'
import { useHandleInstance } from '/@src/stores/handleInstance'

import { tables } from '/@src/utils/app'

const handleError = useHandleError()
const handleInstance = useHandleInstance()

const endpointUrl = API_URLs.CUSTOM_FIELDS
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  tables.FetchAndGroupDependencies(
    componentDependencies,
    'CustomFields',
    renderLoading,
    endpointUrl
  )
})

watchEffect(async () => {
  if (!renderLoading.value) {
    handleInstance.currentPageDependencies = componentDependencies
    await handleInstance.generatePageDependencies()
  }
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Custom Fields')

useHead({
  title: 'Lex Algeria - Custom Fields',
})
</script>


<template>
  <div class="page-content-inner">
    <div class="column is-12">
      <LoaderContainerComponent :render-loading="renderLoading">
        <CustomFieldsComponent :component-dependencies="componentDependencies" />
      </LoaderContainerComponent>
    </div>
  </div>
</template>