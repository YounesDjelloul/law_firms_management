<script setup lang="ts">
import { useNotyf } from '/@src/composable/useNotyf'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { onceImageErrored } from '/@src/utils/via-placeholder'
import { useUserSession } from '/@src/stores/userSession'

import APP_URLs from '/@src/constants/app/urls'

import { forms, formatting } from '/@src/utils/app'
import { users } from '/@src/services/api'

const props = defineProps<{
  componentDependencies: object
}>()

const {
  formSchema,
  initialValues,
  validationSchema,
  userDetails,
  userAvatarProp,
  modalName,
} = props.componentDependencies

console.log(props.componentDependencies)

const userSession = useUserSession()

const notyf = useNotyf()
const { y } = useWindowScroll()
const { t } = useI18n()

const isUploading = ref(false)
const isLoading = ref(false)

const { handleSubmit, setFieldValue } = useForm({
  validationSchema,
  initialValues,
})

const isScrolling = computed(() => {
  return y.value > 30
})

const onAddFile = (error: any, file: any) => {
  if (error) {
    notyf.error(error)
    return
  }

  setFieldValue(userAvatarProp.id, file)
}
const onRemoveFile = (error: any, file: any) => {
  if (error) {
    notyf.error(error)
    return
  }

  setFieldValue(userAvatarProp.id, undefined)
}

const onUpdate = handleSubmit(async (values, actions) => {
  isLoading.value = true

  try {
    values = forms.cleanValuesIfPatch(values, 'patch', userDetails)
    await users.updateUserDetails(values)
    await users.getUserProfile(userSession)
    notyf.success(t('profile.form.update.success'))
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
  <div>
    <form class="form-layout is-stacked">
      <div class="account-box is-form is-footerless">
        <div class="form-head stuck-header" :class="[isScrolling && 'is-stuck']">
          <div class="form-head-inner">
            <div class="left">
              <h3>General Info</h3>
              <p>Edit your account's general information</p>
            </div>
            <div class="right">
              <div class="buttons">
                <VButton
                  :to="APP_URLs.DASHBOARD.url"
                  icon="feather:arrow-left"
                  light
                  dark-outlined
                >
                  Go Back
                </VButton>
                <VButton
                  color="primary"
                  raised
                  :loading="isLoading"
                  tabindex="0"
                  @keydown.space.prevent="onUpdate"
                  @click="onUpdate"
                >
                  Update Profile
                </VButton>
              </div>
            </div>
          </div>
        </div>
        <VLoader :active="isLoading">
          <div v-if="isLoading" class="placeholder-loader"></div>
          <div v-else class="form-body">
            <!--Fieldset-->
            <div class="fieldset">
              <div class="fieldset-heading">
                <h4>Profile Picture</h4>
                <p>This is how others will recognize you</p>
              </div>

              <VAvatar size="xl" class="profile-v-avatar">
                <template #avatar>
                  <img
                    v-if="!isUploading"
                    class="avatar"
                    src="/images/avatars/svg/vuero-1.svg"
                    alt=""
                    @error.once="onceImageErrored(150)"
                  />
                  <VFilePond
                    v-else
                    id="user_avatar.url"
                    class="profile-filepond"
                    name="profile-filepond"
                    :chunk-retry-delays="[500, 1000, 3000]"
                    label-idle="<i class='lnil lnil-cloud-upload'></i>"
                    :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']"
                    :image-preview-height="140"
                    :image-resize-target-width="140"
                    :image-resize-target-height="140"
                    image-crop-aspect-ratio="1:1"
                    style-panel-layout="compact circle"
                    style-load-indicator-position="center bottom"
                    style-progress-indicator-position="right bottom"
                    style-button-remove-item-position="left bottom"
                    style-button-process-item-position="right bottom"
                    @addfile="onAddFile"
                    @removefile="onRemoveFile"
                  />
                  <VIconButton
                    v-if="!isUploading"
                    icon="feather:edit-2"
                    class="edit-button is-edit"
                    circle
                    tabindex="0"
                    @keydown.space.prevent="isUploading = true"
                    @click="isUploading = true"
                  />
                  <VIconButton
                    v-else
                    icon="feather:arrow-left"
                    class="edit-button is-back"
                    circle
                    tabindex="0"
                    @keydown.space.prevent="isUploading = false"
                    @click="isUploading = false"
                  />
                </template>
              </VAvatar>
            </div>

            <!--Fieldset-->
            <div class="fieldset">
              <div class="fieldset-heading">
                <h4>Personal Info</h4>
                <p>Others diserve to know you more</p>
              </div>

              <div class="columns is-multiline">
                <!--Field-->
                <div class="column is-12">
                  <UpdateCreateForm
                    :form-schema="formSchema"
                    :set-field-value="setFieldValue"
                    :modal-name="modalName"
                  />
                </div>
              </div>
            </div>
          </div>
        </VLoader>
      </div>
    </form>
  </div>
</template>