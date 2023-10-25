<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { useI18n } from 'vue-i18n'
import { useNotyf } from '/@src/composable/useNotyf'
import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

import { forms, formatting } from '/@src/utils/app'
import { models } from '/@src/services/api'

const emits = defineEmits<{
  (e: 'handleUpdateInstanceAffect', data): void
}>()

const props = defineProps<{
  formSchema: object
  fieldId: string
  endpointUrl: string
  instancePk: any
  updateAllowedMethod: string
}>()

const modalName = 'invoice'

const notyf = useNotyf()
const { t } = useI18n()

const fieldSelect = useFieldSelect()

const instanceDetails = await models.getInstanceDetails(
  props.endpointUrl,
  props.instancePk
)
const initialValues = forms.generateInitialValues(props.formSchema, instanceDetails)
const validationSchema = toFormValidator(forms.generateValidationSchema(props.formSchema))

await forms.generateAndAssignDataObjectToStore(initialValues, props.formSchema, modalName)

const { handleSubmit, setFieldValue } = useForm({
  validationSchema,
  initialValues,
})

const isLoading = ref(false)

const onUpdate = handleSubmit(async (values, actions) => {
  isLoading.value = true

  try {
    values = forms.cleanValuesIfPatch(values, props.updateAllowedMethod, initialValues)
    const response = await models.updateInstanceDetailsRequest(
      props.endpointUrl,
      props.instancePk,
      values,
      props.updateAllowedMethod
    )
    fieldSelect.handleUpdateOptionAffect(
      response.data,
      props.instancePk,
      props.fieldId,
      modalName
    )
    emits('handleUpdateInstanceAffect', response.data)
  } catch (err) {
    console.log(err)
    const formattedErrors = formatting.formatError(err.response.data)
    actions.setErrors(formattedErrors)
    notyf.error(t('form.invalid'))
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <VModal
    :open="true"
    title="Update Record"
    size="meduim"
    actions="right"
    noscroll
    @close="$emit('handleUpdateInstanceAffect', {})"
  >
    <template #content>
      <VPlaceload v-if="isLoading" />
      <UpdateCreateForm
        v-else
        :form-schema="formSchema"
        :set-field-value="setFieldValue"
        :modal-name="modalName"
      />
    </template>
    <template #action>
      <VButton :loading="isLoading" type="submit" color="primary" raised @click="onUpdate"
        >Create</VButton
      >
    </template>
  </VModal>
</template>

<style lang="scss">
.file-label {
  width: 100%;

  .file-name {
    max-width: none;
    width: 60%;
  }

  .file-cta {
    width: 40%;
  }
}

.custom-dropdown {
  position: relative;
  display: block;
  width: 100%;
  font-size: 1rem;

  .dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 5;
    display: none;
    list-style: none;
    background: var(--dark-sidebar-light-8);
    width: 100%;
    overflow-y: scroll;
    max-height: 120px;
    border-radius: 0px 0px 6px 6px;

    .dropdown-loader {
      padding: 20px 10px 10px 39px;
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 4px;
    }

    li {
      padding: 10px 10px 10px 39px;
      cursor: pointer;
      color: var(--primary--color-invert);

      &:hover {
        background-color: var(--primary);
      }
    }
  }

  &.is-open {
    .dropdown-list {
      display: block;
    }
  }
}

.switch-block {
  padding: 5px 40px;
}

.field-type-container {
  display: flex;

  .field-type-search {
    margin-right: 5px;
  }
}

.v-avatar {
  position: relative;
  display: block;
  margin: 0 auto;
  margin-bottom: 35px;

  .edit-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>