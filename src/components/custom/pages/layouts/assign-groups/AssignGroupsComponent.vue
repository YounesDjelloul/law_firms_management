<script setup lang="ts">
import APP_URLs from '/@src/constants/app/urls'
import { ref } from 'vue'
import { useNotyf } from '/@src/composable/useNotyf'
import { useI18n } from 'vue-i18n'

import { assignGroups } from '/@src/services/api'

const notyf = useNotyf()
const { t } = useI18n()
const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})

const props = defineProps<{
  componentDependencies: object
}>()

const isLoading = ref(false)

const { endpointUrl, tableRows, tableColumns, rowsHeader, keyPath } =
  props.componentDependencies

let results = reactive({})

for (const row of tableRows) {
  results[row.id] = new Set(row.groups)
}

function updateResults(row_id: number, column_id: number, status: boolean) {
  status ? results[row_id].add(column_id) : results[row_id].delete(column_id)
}

const onSubmit = async () => {
  isLoading.value = true

  try {
    for (const pair of Object.entries(results)) {
      const pk = pair[0]
      const data = Array.from(pair[1])

      const callBody = {
        group_ids: data,
      }

      await assignGroups.assignGroupsCall(pk, callBody, endpointUrl, keyPath)
    }

    notyf.success('Groups updated successfully!')
  } catch (err) {
    console.log(err)
    notyf.error(t('form.invalid'))
  } finally {
    isLoading.value = false
  }
}
</script>


<template>
  <form else class="form-layout is-12" @submit.prevent="onSubmit">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Assign Groups</h3>
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
              <VButton
                v-if="isLoading"
                class="timer-button"
                placeload="40px"
                color="primary"
              >
                Button
              </VButton>
              <VButton v-else type="submit" color="primary" raised @click="onSubmit">
                Assign
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <VLoader :active="isLoading" size="large">
          <div v-if="isLoading" class="placeholder-loader"></div>
          <div v-show="!isLoading" class="form-fieldset">
            <div class="fieldset-heading">
              <h4>General information</h4>
              <p>Choose records to assign to</p>
            </div>
            <div class="table-container">
              <assignTable
                :table-rows="tableRows"
                :table-columns="tableColumns"
                :update-results="updateResults"
                :rows-header="rowsHeader"
                :results="results"
              />
            </div>
          </div>
        </VLoader>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';
@import '/@src/scss/components/forms-outer';

.loading-placeload {
  margin: 15px 15px 5px 0px;
}

.table-container {
  overflow-x: scroll;
}

::-webkit-scrollbar {
  height: 9px;
  width: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
}

::-webkit-scrollbar-track {
  background-color: var(--dark-sidebar-light-5);
}

.form-layout {
  max-width: 940px;
  margin: 0 auto;

  .form-fieldset {
    max-width: 780px;
  }
}
</style>