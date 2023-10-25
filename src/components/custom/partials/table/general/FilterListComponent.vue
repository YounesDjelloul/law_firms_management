<script setup lang="ts">
import { toFormValidator } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useNotyf } from '/@src/composable/useNotyf'

import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'
import { useQueryParam } from '/@src/stores/queryParam'
import { forms, formatting } from '/@src/utils/app'

const handleInstance = useHandleCurrentComponent()
const queryParam = useQueryParam()

const notyf = useNotyf()

const props = defineProps<{
  modalName: string
}>()

const { filtersModelSchema: formSchema } = handleInstance.currentPageDependencies

const isLoading = ref(false)

const initialValues = forms.generateInitialValues(
  formSchema,
  formatting.convertFilterStringToObject(queryParam.filtersTerm)
)
const validationSchema = toFormValidator(forms.generateValidationSchema(formSchema))

await forms.generateAndAssignDataObjectToStore(initialValues, formSchema, props.modalName)

isLoading.value = false

const { handleSubmit, setFieldValue } = useForm({
  validationSchema,
  initialValues,
})

const onFilter = handleSubmit((values, actions) => {
  try {
    const filterString = formatting.convertObjectToFilterString(values)
    queryParam.filtersTerm = filterString
    handleInstance.showFilterInstancesPopup = false
  } catch (err) {
    const formattedErrors = formatting.formatError(err.response.data)
    actions.setErrors(formattedErrors)

    notyf.error(t('form.invalid'))
  }
})

const resetFilters = () => {
  queryParam.filtersTerm = ''
  handleInstance.showFilterInstancesPopup = false
}
</script>

<template>
  <VModal
    :open="true"
    :title="`Filter ${modalName}s`"
    size="meduim"
    actions="right"
    noscroll
    @close="handleInstance.showFilterInstancesPopup = false"
  >
    <template #content>
      <VPlaceload v-if="isLoading" />
      <UpdateCreateForm
        v-show="!isLoading"
        :form-schema="formSchema"
        :set-field-value="setFieldValue"
        :modal-name="modalName"
      />
    </template>
    <template #action>
      <VButton
        light
        color="primary"
        class="reset-button"
        style="background: transparent !important"
        @click="resetFilters"
        >Reset Filters</VButton
      >
      <VButton type="submit" color="primary" raised @click="onFilter">Filter</VButton>
    </template>
  </VModal>
</template>

<style lang="scss">
.reset-button {
  position: absolute;
  left: 7px;
}
</style>