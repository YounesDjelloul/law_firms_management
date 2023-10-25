<script setup lang="ts">
import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

const props = defineProps<{
  formSchema: object
  setFieldValue: void
  setFieldError?: void
  values?: object
  modalName: string
}>()

const fieldSelect = useFieldSelect()
const selectedFileNames = reactive({})

function handleUpload(event, schemaField) {
  const file = event.target.files[0]

  if (!file) {
    selectedFileNames[schemaField.id] = 'Select a Picture..'
  } else {
    selectedFileNames[schemaField.id] = file.name

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      props.setFieldValue(schemaField.id, reader.result)
    }
  }
}

const setBooleanField = (e) => {
  const fieldId = e.target.ariaLabel
  const status = e.target.checked

  props.setFieldValue(fieldId, status)
}

const createPopup = ref(false)
const nextCreateSchema = ref([])
const nextEndpointUrl = ref('')
const nextPopupTitle = ref('')
const nextFieldId = ref('')

const showCreatePopup = (nextComponentDependencies: object) => {
  nextCreateSchema.value = nextComponentDependencies.formSchema
  nextEndpointUrl.value = nextComponentDependencies.nextEndpointUrl
  nextPopupTitle.value = nextComponentDependencies.label
  nextFieldId.value = nextComponentDependencies.fieldId
  createPopup.value = true
}
</script>

<template>
  <div>
    <form class="modal-form">
      <SubCreateInstanceComponent
        v-if="createPopup"
        :form-schema="nextCreateSchema"
        :modal-name="nextPopupTitle"
        :endpoint-url="nextEndpointUrl"
        :field-id="nextFieldId"
        @handle-create-instance-affect="
          (instance, fieldId) =>
            fieldSelect.handleNewOptionCreationAffect(
              instance,
              fieldId,
              modalName,
              nextPopupTitle
            )
        "
        @close-popup="createPopup = false"
      />
      <div
        v-for="group in formSchema"
        :key="group.name"
        class="create-update-form-section"
      >
        <CustomCollapse
          v-if="group.name !== 'general'"
          :init-status="group.collapsed"
          :title="group.name"
        >
          <VField
            v-for="schemaField in group.form"
            :id="schemaField.id"
            :key="schemaField.id"
            v-slot="{ field }"
          >
            <VLabel v-tooltip.bottom.right.info.rounded="schemaField.help_text">
              {{ schemaField.label }}
              <i
                v-if="schemaField.help_text"
                aria-hidden="true"
                class="iconify"
                data-icon="feather:help-circle"
              ></i>
            </VLabel>
            <VControl
              class="has-icons-left"
              :icon="
                schemaField.html_input_type === 'checkbox' || schemaField.type === 'list'
                  ? ''
                  : 'feather:user'
              "
              :class="{ 'is-field-select': schemaField.type === 'field' }"
            >
              <div v-if="schemaField.type === 'field'">
                <MultipleFieldSelectComponent
                  v-if="schemaField.relationship === 'many_to_many'"
                  :schema-field="schemaField"
                  :set-field-value="setFieldValue"
                  :modal-name="modalName"
                  @show-create-popup="showCreatePopup"
                />
                <OneFieldSelectComponent
                  v-else
                  :schema-field="schemaField"
                  :set-field-value="setFieldValue"
                  :modal-name="modalName"
                  @show-create-popup="showCreatePopup"
                />
              </div>
              <OptionsListFieldComponent
                v-else-if="schemaField.type === 'list'"
                :field-schema="schemaField"
                :set-field-value="setFieldValue"
                :set-field-error="setFieldError"
                :values="values"
              />
              <VSelect v-else-if="schemaField.html_input_type === 'select'">
                <VOption value="" disabled>Select {{ schemaField.label }}</VOption>
                <VOption
                  v-for="choice in schemaField.choices"
                  :key="choice.value"
                  :value="choice.value"
                  >{{ choice.display_name }}</VOption
                >
              </VSelect>
              <div
                v-else-if="
                  schemaField.html_input_type == 'file' ||
                  schemaField.type == 'image upload'
                "
                class="file has-name"
              >
                <label class="file-label">
                  <input
                    :id="schemaField.id"
                    class="file-input"
                    type="file"
                    name="resume"
                    @change="handleUpload($event, schemaField)"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-cloud-upload-alt"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <span class="file-name light-text">
                    {{ selectedFileNames[schemaField.id] ?? 'Select a Picture..' }}
                  </span>
                </label>
              </div>
              <VSwitchSegment
                v-else-if="schemaField.drf_type === 'boolean'"
                :aria-label="schemaField.id"
                color="primary"
                label-true="YES"
                label-false="NO"
                @change="setBooleanField"
              />
              <VInput
                v-else
                :type="schemaField.html_input_type"
                :placeholder="schemaField.placeholder"
              />
              <p v-if="field?.errors?.value?.length" class="help is-danger">
                {{ field.errors?.value?.join(', ') }}
              </p>
              <p v-else-if="schemaField.required" class="help is-primary">
                Required Field
              </p>
            </VControl>
          </VField>
        </CustomCollapse>
        <VField
          v-for="schemaField in group.form"
          v-else
          :id="schemaField.id"
          :key="schemaField.id"
          v-slot="{ field }"
        >
          <VLabel v-tooltip.bottom.right.info.rounded="schemaField.help_text">
            {{ schemaField.label }}
            <i
              v-if="schemaField.help_text"
              aria-hidden="true"
              class="iconify"
              data-icon="feather:help-circle"
            ></i>
          </VLabel>
          <VControl
            class="has-icons-left"
            :icon="
              schemaField.html_input_type === 'checkbox' || schemaField.type === 'list'
                ? ''
                : 'feather:user'
            "
            :class="{ 'is-field-select': schemaField.type === 'field' }"
          >
            <div v-if="schemaField.type === 'field'">
              <MultipleFieldSelectComponent
                v-if="schemaField.relationship === 'many_to_many'"
                :schema-field="schemaField"
                :set-field-value="setFieldValue"
                :modal-name="modalName"
                @show-create-popup="showCreatePopup"
              />
              <OneFieldSelectComponent
                v-else
                :schema-field="schemaField"
                :set-field-value="setFieldValue"
                :modal-name="modalName"
                @show-create-popup="showCreatePopup"
              />
            </div>
            <OptionsListFieldComponent
              v-else-if="schemaField.type === 'list'"
              :field-schema="schemaField"
              :set-field-value="setFieldValue"
              :set-field-error="setFieldError"
              :values="values"
            />
            <VSelect v-else-if="schemaField.html_input_type === 'select'">
              <VOption value="" disabled>Select {{ schemaField.label }}</VOption>
              <VOption
                v-for="choice in schemaField.choices"
                :key="choice.value"
                :value="choice.value"
                >{{ choice.display_name }}</VOption
              >
            </VSelect>
            <div
              v-else-if="
                schemaField.html_input_type == 'file' ||
                schemaField.type == 'image upload'
              "
              class="file has-name"
            >
              <label class="file-label">
                <input
                  :id="schemaField.id"
                  class="file-input"
                  type="file"
                  name="resume"
                  @change="handleUpload($event, schemaField)"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span class="file-label"> Choose a file… </span>
                </span>
                <span class="file-name light-text">
                  {{ selectedFileNames[schemaField.id] ?? 'Select a Picture..' }}
                </span>
              </label>
            </div>
            <VSwitchSegment
              v-else-if="schemaField.html_input_type === 'checkbox'"
              :aria-label="schemaField.id"
              color="primary"
              label-true="YES"
              label-false="NO"
              @change="setBooleanField"
            />
            <VInput
              v-else
              :type="schemaField.html_input_type"
              :placeholder="schemaField.placeholder"
            />
            <p v-if="field?.errors?.value?.length" class="help is-danger">
              {{ field?.errors?.value?.join(', ') }}
            </p>
            <p v-else-if="schemaField.required" class="help is-primary">Required Field</p>
          </VControl>
        </VField>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.is-dark {
  .collapse-container {
    background: var(--dark-sidebar-light-8);
    border: 1px solid var(--dark-sidebar-light-12);
  }
}

.collapse-container {
  background-color: var(--white);
  border: 1px solid var(--fade-grey-dark-3);
}

.create-update-form-section {
  margin-bottom: 20px;
}

.create-update-form-section:last-child,
.collapse-container:last-child {
  margin-bottom: 0;
}

.modal-card-body {
  overflow-x: hidden;
}

.modal-form {
  padding: 10px 10px 20px !important;

  .field {
    > .label {
      display: flex;
      align-items: center;
      width: fit-content;

      svg {
        margin-left: 5px;
      }
    }
  }
}

.control {
  &.is-field-select {
    width: 90% !important;
  }

  .switch-segment {
    justify-content: flex-start;
  }
}
</style>