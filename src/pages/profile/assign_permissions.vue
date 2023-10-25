<route lang="yaml">
meta:
    name: "assign_permissions_to_group"
</route>
        
<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useHandleError } from '/@src/stores/handleError'

import { assignPermissions } from '/@src/utils/app'

const handleError = useHandleError()

const endpointUrl = API_URLs.GROUPS
const renderLoading = ref(true)

const componentDependencies = reactive({ endpointUrl })

onMounted(() => {
  assignPermissions.fetchAssignPermissionsSchemas(componentDependencies, renderLoading)
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Assign Permissions')

useHead({
  title: 'Lex Algeria - Assign Permissions',
})
</script>
            
<template>
  <div>
    <LoaderContainerComponent :render-loading="renderLoading">
      <AssignPermissionsComponent :component-dependencies="componentDependencies" />
    </LoaderContainerComponent>
  </div>
</template>