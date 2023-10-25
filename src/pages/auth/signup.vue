<script setup lang="ts">
import APP_URLs from '/@src/constants/app/urls'
import API_URLs from '/@src/constants/api/urls'

import { useI18n } from 'vue-i18n'

import { useHead } from '@vueuse/head'
import { toFormValidator } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { tables, formatting, forms } from '/@src/utils/app'
import { auth } from '/@src/services/api'

import { useDarkmode } from '/@src/stores/darkmode'
import { useNotyf } from '/@src/composable/useNotyf'

const darkmode = useDarkmode()
const router = useRouter()
const notyf = useNotyf()

const { t } = useI18n()

const endpointUrl = API_URLs.REGISTRATION
const renderLoading = ref(true)
const errorToDisplay = ref('')

const componentDependencies = reactive({})

await tables.FetchAndGroupDependencies(
  componentDependencies,
  'Registeration',
  renderLoading,
  errorToDisplay,
  endpointUrl
)

const validationSchema = toFormValidator(
  forms
    .generateValidationSchema(componentDependencies.createSchema)
    .refine((data) => data.password1 === data.password2, {
      message: t('auth.errors.passwordCheck.match'),
      path: ['password2'],
    })
)

const { handleSubmit, setFieldValue, isSubmitting } = useForm({
  validationSchema,
})

const onSignup = handleSubmit(async (values, actions) => {
  try {
    await auth.registerUser(values)

    notyf.dismissAll()
    notyf.success('Welcome, ' + values.username)

    router.push(APP_URLs.LOGIN)
  } catch (err: any) {
    console.log(err)
    const formattedErrors = formatting.formatError(err.response.data)
    actions.setErrors(formattedErrors)
    notyf.error(t('form.invalid'))
  } finally {
    isLoading.value = false
  }
})

useHead({
  title: 'LexAlgeria - Signup',
})
</script>

<template>
  <div class="auth-wrapper-inner columns is-gapless">
    <!-- Form section -->
    <div class="column is-5">
      <div class="hero is-fullheight is-white">
        <div class="hero-heading">
          <label
            class="dark-mode ml-auto"
            tabindex="0"
            @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
          >
            <input
              type="checkbox"
              :checked="!darkmode.isDark"
              @change="darkmode.onChange"
            />
            <span></span>
          </label>
          <div class="auth-logo">
            <RouterLink to="/">
              <AnimatedLogo class="top-logo" width="36px" height="36px" />
            </RouterLink>
          </div>
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-12">
                <div class="auth-content">
                  <h2>{{ t('auth.title') }}</h2>
                  <p>{{ t('auth.subtitle') }}</p>
                  <RouterLink :to="APP_URLs.LOGIN">
                    {{ t('auth.action.login') }}
                  </RouterLink>
                </div>
                <div class="auth-form-wrapper">
                  <form @submit="onSignup">
                    <div id="signin-form" class="login-form">
                      <UpdateCreateForm
                        :form-schema="componentDependencies.createModelSchema"
                        :set-field-value="setFieldValue"
                      />

                      <div class="login">
                        <VButton
                          :loading="isSubmitting"
                          type="submit"
                          color="primary"
                          bold
                          fullwidth
                          raised
                        >
                          {{ t('auth.action.signup') }}
                        </VButton>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image section (hidden on mobile) -->
    <div class="column login-column is-7 is-hidden-mobile hero-banner">
      <div class="hero login-hero is-fullheight is-app-grey">
        <div class="hero-body">
          <div class="columns">
            <div class="column is-10 is-offset-1">
              <img
                class="light-image has-light-shadow has-light-border"
                src="/@src/assets/illustrations/apps/vuero-banking-light.webp"
                alt=""
              />
              <img
                class="dark-image has-light-shadow"
                src="/@src/assets/illustrations/apps/vuero-banking-dark.webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="hero-footer">
          <p class="has-text-centered"></p>
        </div>
      </div>
    </div>
  </div>
</template>
