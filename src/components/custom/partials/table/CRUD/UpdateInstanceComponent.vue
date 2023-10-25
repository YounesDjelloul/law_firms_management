<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'

import { useI18n } from 'vue-i18n'
import { useNotyf } from '/@src/composable/useNotyf'
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'
import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

import { forms, formatting } from '/@src/utils/app'
import { models } from '/@src/services/api'

const props = defineProps<{
  modalName: string
}>()

const { t } = useI18n()
const notyf = useNotyf()

const fieldSelect = useFieldSelect()
const handleInstance = useHandleCurrentComponent()

const instanceDetails = handleInstance.instanceToAct

const isLoading = ref(true)

const {
  updateValidationSchema,
  updateModelSchema: formSchema,
  endpointUrl,
  updateMethod: updateAllowedMethod,
  modelPk,
} = handleInstance.currentPageDependencies

const initialValues = forms.generateInitialValues(formSchema, instanceDetails)
const validationSchema = toFormValidator(updateValidationSchema)

onMounted(async () => {
  await forms.generateAndAssignDataObjectToStore(
    initialValues,
    formSchema,
    props.modalName
  )
  isLoading.value = false
})

const { handleSubmit, setFieldValue, isSubmitting } = useForm({
  validationSchema,
  initialValues,
})

const onUpdate = handleSubmit(async (values, actions) => {
  try {
    values = forms.cleanValuesIfPatch(values, updateAllowedMethod, initialValues)
    if (formSchema.custom) {
      formatting.formatCustomFieldsInValues(values, formSchema.custom.form)
    }

    const { data } = await models.updateInstanceDetailsRequest(
      endpointUrl,
      handleInstance.instanceToAct[modelPk],
      values,
      updateAllowedMethod
    )

    handleInstance.handleInstanceUpdateAffect(data)
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
    :title="`Update ${modalName} record`"
    size="meduim"
    actions="right"
    noscroll
    @close="handleInstance.showUpdateInstancePopup = false"
  >
    <template #content>
      <VLoader :active="isLoading">
        <div v-if="isLoading" class="placeholder-loader"></div>
        <UpdateCreateForm
          v-else
          :form-schema="formSchema"
          :set-field-value="setFieldValue"
          :modal-name="modalName"
        />
      </VLoader>
    </template>
    <template #action>
      <VButton
        v-if="!isLoading"
        :loading="isSubmitting"
        type="submit"
        color="primary"
        raised
        @click="onUpdate"
        >Update</VButton
      >
    </template>
  </VModal>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';
@import '/@src/scss/components/forms-outer';

.is-navbar {
  .form-layout {
    margin-top: 30px;
  }
}

.form-layout {
  max-width: 740px;
  margin: 0 auto;

  &.is-stacked {
    .form-outer {
      .form-body {
        padding: 0;

        .form-section {
          padding: 40px;
          border-bottom: 1px solid var(--fade-grey-dark-4);

          &.is-grey {
            background: #fafafa;
          }

          .form-section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--fade-grey-dark-4);
            padding-bottom: 20px;
            margin-bottom: 30px;

            .left {
              h3 {
                font-family: var(--font-alt);
                font-weight: 600;
                color: var(--dark-text);
              }
            }
          }

          .form-section-inner {
            &.is-horizontal {
              max-width: 540px;
            }

            .field {
              &.is-horizontal {
                .field-label {
                  padding-top: 0.75em;
                }
              }
            }
          }

          .columns {
            .column {
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
            }
          }

          .field {
            .control {
              .checkbox {
                padding: 0;
                padding-right: 10px;
                font-size: 0.9rem;
              }
            }
          }

          .participants {
            display: flex;
            padding-bottom: 10px;

            .v-avatar {
              margin-right: 8px;
            }

            .add-participant {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 40px;
              width: 40px;
              min-width: 40px;
              border-radius: var(--radius-rounded);
              border: 1.6px dashed var(--light-text);
              color: var(--light-text);
              padding: 0;
              background: none;
              margin-left: 4px;
              cursor: pointer;
              transition: color 0.3s, background-color 0.3s, border-color 0.3s,
                height 0.3s, width 0.3s;

              &:hover,
              &:focus {
                border: 1.6px solid var(--primary);
                color: var(--primary);
              }

              &:focus-visible {
                outline-offset: var(--accessibility-focus-outline-offset);
                outline-width: var(--accessibility-focus-outline-width);
                outline-style: var(--accessibility-focus-outline-style);
                outline-color: var(--accessibility-focus-outline-color);
              }

              svg {
                height: 16px;
                width: 16px;
              }
            }
          }

          .color-codes {
            display: flex;
            align-items: center;
            height: 38px;

            .color-code {
              height: 14px;
              width: 14px;
              border-radius: var(--radius-rounded);
              background: var(--white);
              margin-right: 10px;
              border: 3px solid var(--light-text);
              cursor: pointer;
              opacity: 0.6;
              transition: color 0.3s, background-color 0.3s, border-color 0.3s,
                height 0.3s, width 0.3s;

              &:hover,
              &:focus {
                opacity: 1;
              }

              &:focus-visible {
                outline-offset: var(--accessibility-focus-outline-offset);
                outline-width: var(--accessibility-focus-outline-width);
                outline-style: var(--accessibility-focus-outline-style);
                outline-color: var(--accessibility-focus-outline-color);
              }

              &.is-primary {
                border-color: var(--primary);

                &.is-active {
                  background: var(--primary);
                }
              }

              &.is-secondary {
                border-color: var(--secondary);

                &.is-active {
                  background: var(--secondary);
                }
              }

              &.is-info {
                border-color: var(--info);

                &.is-active {
                  background: var(--info);
                }
              }

              &.is-success {
                border-color: var(--success);

                &.is-active {
                  background: var(--success);
                }
              }

              &.is-purple {
                border-color: var(--purple);

                &.is-active {
                  background: var(--purple);
                }
              }
            }
          }

          .add-link {
            display: inline-block;
            padding: 4px 0;
            font-family: var(--font);
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--primary);
          }
        }
      }
    }
  }
}

.is-dark {
  .form-layout {
    &.is-stacked {
      .form-outer {
        .form-body {
          .form-section {
            border-color: var(--dark-sidebar-light-12);

            &.is-grey {
              background: var(--dark-sidebar-light-4);
            }

            .form-section-header {
              border-color: var(--dark-sidebar-light-12);

              .left {
                h3 {
                  color: var(--dark-dark-text);
                }
              }
            }

            .form-section-inner {
              .add-link {
                color: var(--primary);
              }

              .color-codes {
                .color-code {
                  background: var(--dark-sidebar-light-6);

                  &.is-primary {
                    border-color: var(--primary);
                  }
                }
              }

              .participants {
                .add-participant {
                  &:hover {
                    border: 1.6px solid var(--primary);
                    color: var(--primary);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .form-layout {
    &.is-stacked {
      .form-outer {
        .form-body {
          .is-vhidden {
            display: none !important;
          }
        }
      }

      .v-calendar-combo {
        margin: 0 !important;

        .column {
          padding-top: 0 !important;
          padding-bottom: 0 !important;

          &:first-child {
            padding-left: 0 !important;
          }

          &:last-child {
            padding-right: 0 !important;
          }
        }
      }
    }
  }
}
</style>
