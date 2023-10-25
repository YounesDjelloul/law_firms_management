<script setup="ts">
import { useHead } from '@vueuse/head'
import { useViewWrapper } from '/@src/stores/viewWrapper'

import { toFormValidator } from '@vee-validate/zod'

import { forms, shared } from '/@src/utils/app'
import { users } from '/@src/services/api'

const modalName = 'profile'
const renderLoading = ref(true)

let userDetails = await users.getUserDetails()
let componentDependencies = { modalName, userDetails }

onMounted(async () => {
  componentDependencies.formSchema = await users.getFormattedUpdateUserSchema(
    userDetails.id
  )
  componentDependencies.userAvatarProp = shared.arrayPop(
    'url',
    componentDependencies.formSchema
  )

  componentDependencies.initialValues = forms.generateInitialValues(
    componentDependencies.formSchema,
    userDetails
  )
  componentDependencies.validationSchema = toFormValidator(
    forms.generateValidationSchema(componentDependencies.formSchema)
  )

  await forms.generateAndAssignDataObjectToStore(
    componentDependencies.initialValues,
    componentDependencies.formSchema,
    modalName
  )

  renderLoading.value = false
})

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Profile Update')

useHead({
  title: 'Profile Update - LexAlgeria',
})
</script>

<template>
  <div>
    <LoaderContainerComponent :render-loading="renderLoading">
      <UpdateProfile :component-dependencies="componentDependencies" />
    </LoaderContainerComponent>
  </div>
</template>