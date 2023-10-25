<route lang="yaml">
  meta:
    name: "invoice"
  </route>

<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

import { toFormValidator } from '@vee-validate/zod'
import { provide } from 'vue'
import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'
import { useHandleError } from '/@src/stores/handleError'

import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

import { forms, tables } from '/@src/utils/app'

const fieldSelect = useFieldSelect()
const handleError = useHandleError()

const modalName = 'invoice'
const endpointUrl = API_URLs.BILLING__INVOICES
const renderLoading = ref(true)

const componentDependencies = reactive({
  tableFieldsSchema: { general: { name: 'general', form: [] } },
  normalFieldsSchema: { general: { name: 'general', form: [] } },
  modalName,
})

onMounted(async () => {
  await tables.InvoicesDependencyGenerator(
    componentDependencies,
    'deepInvoice',
    endpointUrl
  )
  componentDependencies.initialValues = forms.generateInitialValues(
    componentDependencies.overAllSchema
  )
  componentDependencies.validationSchema = toFormValidator(
    forms.generateValidationSchema(componentDependencies.overAllSchema)
  )

  await forms.generateAndAssignDataObjectToStore(
    componentDependencies.initialValues,
    componentDependencies.tableFieldsSchema,
    modalName,
    true
  )

  renderLoading.value = false
})

onUnmounted(() => {
  fieldSelect.clearStore()
})

provide('endpointUrl', endpointUrl)

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Invoice Form')

useHead({
  title: 'Lex Algeria - Invoice Form',
})
</script>

<template>
  <div>
    <LoaderContainerComponent :render-loading="renderLoading">
      <DeepInvoiceForm :component-dependencies="componentDependencies" />
    </LoaderContainerComponent>
  </div>
</template>