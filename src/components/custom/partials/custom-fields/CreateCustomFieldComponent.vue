<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

import { useI18n } from 'vue-i18n'
import { useNotyf } from '/@src/composable/useNotyf'
import { useHandleInstance } from '/@src/stores/handleInstance'

import { forms, formatting } from '/@src/utils/app'
import { models } from '/@src/services/api'

const props = defineProps<{
  modalName: string
}>()

const notyf = useNotyf()
const { t } = useI18n()

const fieldSelect = useFieldSelect()
const handleInstance = useHandleInstance()

const isLoading = ref(true)

const {
  createInitialValues,
  createValidationSchema,
  createModelSchema: formSchema,
  endpointUrl,
} = handleInstance.currentPageDependencies

const initialValues = createInitialValues
const validationSchema = toFormValidator(
  createValidationSchema.refine(
    (data) =>
      (data.html_input_type === 'select' && data.choices) ||
      data.html_input_type !== 'select',
    {
      message: 'At least one option must be created',
      path: ['choices'],
    }
  )
)

await forms.generateAndAssignDataObjectToStore(initialValues, formSchema, props.modalName)
isLoading.value = false

const { handleSubmit, setFieldValue, setFieldError, values } = useForm({
  validationSchema,
  initialValues,
})

const onCreate = handleSubmit(async (values, actions) => {
  try {
    forms.cleanObjectForEmptyValues(values)
    const { data } = await models.createNewInstance(endpointUrl, values)
    handleInstance.handleInstanceCreationAffect(data)
  } catch (err) {
    const formattedErrors = formatting.formatError(err.response.data)
    actions.setErrors(formattedErrors)
    notyf.error(t('form.invalid'))
  } finally {
    fieldSelect.clearSelection(props.modalName)
  }
})
</script>

<template>
  <VModal
    :open="true"
    :title="`Create new ${modalName}`"
    size="meduim"
    actions="right"
    noscroll
    @close="handleInstance.showCreateInstancePopup = false"
  >
    <template #content>
      <VLoader :active="isLoading">
        <div v-if="isLoading" class="placeholder-loader"></div>
        <UpdateCreateForm
          v-else
          :form-schema="formSchema"
          :set-field-value="setFieldValue"
          :set-field-error="setFieldError"
          :values="values"
          :modal-name="modalName"
        />
      </VLoader>
    </template>
    <template #action>
      <VButton v-if="!isLoading" type="submit" color="primary" raised @click="onCreate"
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