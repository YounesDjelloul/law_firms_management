<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { useI18n } from 'vue-i18n'
import { useNotyf } from '/@src/composable/useNotyf'
import { useHandleTimeEntries } from '/@src/stores/handleTimeEntries'
import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

import { forms, formatting } from '/@src/utils/app'
import { models, timeEntries } from '/@src/services/api'

const modalName = 'time entry'

const notyf = useNotyf()
const { t } = useI18n()
const fieldSelect = useFieldSelect()

const handleTimeEntries = useHandleTimeEntries()

const initialValues =
  handleTimeEntries.timeEntryDependencies.initialValues ??
  forms.generateInitialValues(handleTimeEntries.timeEntryDependencies.createModelSchema)

const validationSchema = toFormValidator(
  handleTimeEntries.timeEntryDependencies.validationSchema ??
    forms.generateValidationSchema(
      handleTimeEntries.timeEntryDependencies.createModelSchema
    )
)

const { handleSubmit, setFieldValue } = useForm({
  validationSchema,
  initialValues,
})

const isLoading = ref(false)

const onCreate = handleSubmit(async (values, actions) => {
  isLoading.value = true

  try {
    forms.cleanObjectForEmptyValues(values)
    const response = await models.createNewInstance(handleTimeEntries.endpointUrl, values)
    await timeEntries.toggleTimeEntryCall(handleTimeEntries.endpointUrl, response.data.id)

    handleTimeEntries.createAndStartTimeEntryAffect()
  } catch (err) {
    const formattedErrors = formatting.formatError(err.response.data)
    actions.setErrors(formattedErrors)
    notyf.error(t('form.invalid'))
  } finally {
    isLoading.value = false
    handleTimeEntries.showCreateTimeEntryPopup = false
    fieldSelect.clearSelection(modalName)
  }
})
</script>

<template>
  <VModal
    :open="true"
    title="Create New Time Entry"
    size="meduim"
    actions="right"
    noscroll
    @close="handleTimeEntries.showCreateTimeEntryPopup = false"
  >
    <template #content>
      <VPlaceload v-if="isLoading" />
      <div v-else>
        <div class="counter-container">
          <span>Counter</span>
          <span>00:00:00</span>
        </div>
        <UpdateCreateForm
          :form-schema="handleTimeEntries.timeEntryDependencies.createModelSchema"
          :set-field-value="setFieldValue"
          :modal-name="modalName"
        />
      </div>
    </template>
    <template #action>
      <VButton :loading="isLoading" type="submit" color="primary" raised @click="onCreate"
        >Create and start timer</VButton
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

.counter-container {
  margin: 0 0 10px 10px;

  > span:first-child {
    display: block;
    font-family: var(--font);
    font-size: 0.9rem;
    color: var(--light-text) !important;
    font-weight: 400;
    margin-bottom: 15px;
  }

  > span:last-child {
    font-size: 2.5rem;
    display: block;
    width: 100%;
    text-align: center;
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