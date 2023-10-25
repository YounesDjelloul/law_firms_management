<script setup lang="ts">
import APP_URLs from '/@src/constants/app/urls'

import { useForm } from 'vee-validate'

import { useI18n } from 'vue-i18n'
import { useNotyf } from '/@src/composable/useNotyf'
import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

import { formatting, forms } from '/@src/utils/app'
import { models } from '/@src/services/api'

const props = defineProps<{
  componentDependencies: object
}>()

const endpointUrl = inject('endpointUrl')

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
})

const fieldSelect = useFieldSelect()
const fieldsData = fieldSelect.fieldsTypeData[props.componentDependencies.modalName]

const notyf = useNotyf()
const { y } = useWindowScroll()
const { t } = useI18n()

const isStuck = computed(() => {
  return y.value > 30
})

const instancePk = ref('')
const updateAllowedMethod = ref('')

const createPopup = ref(false)
const updatePopup = ref(false)

const nextPopupSchema = ref([])
const nextEndpointUrl = ref('')
const nextPopupTitle = ref('')
const nextFieldId = ref()

const showCreatePopup = (nextComponentDependencies: object) => {
  nextPopupSchema.value = nextComponentDependencies.formSchema
  nextEndpointUrl.value = nextComponentDependencies.nextEndpointUrl
  nextPopupTitle.value = nextComponentDependencies.label
  nextFieldId.value = nextComponentDependencies.fieldId

  createPopup.value = true
}

const onShowUpdatePopup = (field, instanceId) => {
  nextPopupSchema.value = fieldsData[field.id].updateSchema
  updateAllowedMethod.value = fieldsData[field.id].updateAllowedMethod
  nextFieldId.value = field.id
  nextEndpointUrl.value = field.endpoint_url
  instancePk.value = instanceId

  updatePopup.value = true
}

const onCreate = handleSubmit(async (values, actions) => {
  isLoading.value = true

  try {
    forms.cleanObjectForEmptyValues(values)
    await models.createNewInstance(endpointUrl.value, values)
    notyf.success('Invoice Created Successfully..')
  } catch (err) {
    const formattedErrors = formatting.formatError(err.response.data)
    actions.setErrors(formattedErrors)
    notyf.error(t('form.invalid'))
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <form class="form-layout column" @submit.prevent="onSubmit">
    <SubCreateInstanceComponent
      v-if="createPopup"
      :form-schema="nextPopupSchema"
      :modal-name="nextPopupTitle"
      :endpoint-url="nextEndpointUrl"
      :field-id="nextFieldId"
      @handle-create-instance-affect="
        (instance, fieldId) =>
          fieldSelect.handleNewOptionCreationAffect(instance, fieldId, modalName)
      "
      @close-popup="createPopup = false"
    />

    <UpdateInvoicesFieldComponent
      v-if="updatePopup"
      :form-schema="nextPopupSchema"
      :field-id="nextFieldId"
      :endpoint-url="nextEndpointUrl"
      :instance-pk="instancePk"
      :update-allowed-method="updateAllowedMethod"
      @handle-update-instance-affect="updatePopup = false"
    />

    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Create New Invoice</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="feather:arrow-left"
                :to="APP_URLs.DASHBOARD.url"
                light
                dark-outlined
              >
                Cancel
              </VButton>
              <VButton type="submit" color="primary" raised @click="onCreate">
                Create
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>General information</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
          </div>

          <div class="columns is-multiline">
            <div
              v-for="field in componentDependencies.normalFieldsSchema.general.form"
              :key="field.id"
              class="column is-6"
            >
              <VField :id="field.id" v-slot="{ f }">
                <VLabel>{{ field.label }}</VLabel>
                <VControl :icon="field.drf_type !== 'choice' ? 'feather:user' : ''">
                  <VSelect v-if="field.html_input_type === 'select'">
                    <VOption value="" disabled>Select {{ field.label }}</VOption>
                    <VOption
                      v-for="choice in field.choices"
                      :key="choice.value"
                      :value="choice.value"
                      >{{ choice.display_name }}</VOption
                    >
                  </VSelect>
                  <VInput
                    v-else
                    :type="field.html_input_type"
                    :placeholder="field.placeholder"
                  />
                  <p v-if="f?.errors?.value?.length" class="help is-danger">
                    {{ f.errors?.value?.join(', ') }}
                  </p>
                  <p v-else-if="field.required" class="help is-primary">Required Field</p>
                </VControl>
              </VField>
            </div>
          </div>
        </div>

        <div
          v-for="field in componentDependencies.tableFieldsSchema.general.form"
          :key="field.id"
          class="form-fieldset"
        >
          <div class="fieldset-heading">
            <h4>
              {{ field.label }}
            </h4>
            <p>More details</p>
          </div>

          <fieldTable
            class="field-table"
            :records="fieldsData[field.id].options"
            :field="field"
            @trigger-update="onShowUpdatePopup"
          />

          <div class="columns is-multiline">
            <div class="column is-12">
              <VField :id="field.id" v-slot="{ f }">
                <VLabel>{{ field.label }}</VLabel>
                <VControl icon="feather:briefcase">
                  <MultipleFieldSelectComponent
                    v-if="field.relationship === 'many_to_many'"
                    :schema-field="field"
                    :set-field-value="setFieldValue"
                    :modal-name="componentDependencies.modalName"
                    @show-create-popup="showCreatePopup"
                  />
                  <OneFieldSelectComponent
                    v-else
                    :schema-field="field"
                    :set-field-value="setFieldValue"
                    :modal-name="componentDependencies.modalName"
                    @show-create-popup="showCreatePopup"
                  />
                  <p v-if="f?.errors?.value?.length" class="help is-danger">
                    {{ f.errors?.value?.join(', ') }}
                  </p>
                  <p v-else-if="field.required" class="help is-primary">Required Field</p>
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';
@import '/@src/scss/components/forms-outer';

.update-create-button {
  cursor: pointer;
}

.field-table {
  margin-bottom: 2.5rem;
}

.form-layout {
  max-width: 940px;
  margin: 0 auto;
}

.form-fieldset {
  max-width: 680px;
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
</style>