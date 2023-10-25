<route lang="yaml">
meta:
    name: "assign_groups_to_user"
</route>
    
<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useHandleError } from '/@src/stores/handleError'

import { assignGroupsHelpers } from '/@src/utils/app'

const handleError = useHandleError()

const endpointUrl = API_URLs.USERS
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  assignGroupsHelpers.fetchAssignGroupsSchemas(componentDependencies, renderLoading)
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Assign Groups')

useHead({
  title: 'Lex Algeria - Assign Groups',
})
</script>
        
<template>
  <div>
    <LoaderContainerComponent :render-loading="renderLoading">
      <AssignGroupsComponent :component-dependencies="componentDependencies" />
    </LoaderContainerComponent>
  </div>
</template>