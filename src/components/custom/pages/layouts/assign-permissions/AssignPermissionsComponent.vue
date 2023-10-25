<script setup lang="ts">
import APP_URLs from '/@src/constants/app/urls'
import { ref } from 'vue'
import { useNotyf } from '/@src/composable/useNotyf'
import { useI18n } from 'vue-i18n'

import { assignPermissions, assignGroupsHelpers } from '/@src/utils/app'
import { assignGroups } from '/@src/services/api'

const notyf = useNotyf()
const { t } = useI18n()

const props = defineProps<{
  componentDependencies: object
}>()

const { endpointUrl, rowsSchema, columnsSchema, keyPath, groups, valuesToSubmit } =
  props.componentDependencies

const isPermissionsLoading = ref(true)
const isLoading = ref(false)

const permissions = ref()
const currentPermissionsPage = ref(1)
const totalPermissions = ref()

watchEffect(async () => {
  isPermissionsLoading.value = true

  const { count, results } = await assignPermissions.getTableColumns(
    columnsSchema,
    currentPermissionsPage.value
  )

  totalPermissions.value = count
  permissions.value = results

  isPermissionsLoading.value = false
})

const currentGroup = ref(groups[0]['id'])

function updateResults(e) {
  const permissionId = parseInt(e.target.ariaLabel)
  const status = e.target.checked

  if (status) {
    if (!valuesToSubmit[currentGroup.value].has(permissionId)) {
      valuesToSubmit[currentGroup.value].add(permissionId)
    }
  } else {
    valuesToSubmit[currentGroup.value].delete(permissionId)
  }
}

const permissionsSearch = ref('')

watchEffect(async () => {
  isPermissionsLoading.value = true

  const { count, results } = await assignPermissions.searchPermissions(
    columnsSchema,
    permissionsSearch.value
  )

  totalPermissions.value = count
  permissions.value = results

  isPermissionsLoading.value = false
})

const onSubmit = async () => {
  isLoading.value = true

  try {
    for (const pair of Object.entries(valuesToSubmit)) {
      const pk = pair[0]
      const data = pair[1]

      const callBody = {
        [columnsSchema.id]: Array.from(data),
      }

      await assignGroups.assignGroupsCall(pk, callBody, endpointUrl, keyPath)
    }

    notyf.success('Permissions updated successfully!')
  } catch (err) {
    console.log(err)
    notyf.error(t('form.invalid'))
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="invoice-wrapper">
    <div class="invoice-header">
      <div class="left">
        <h3>Assign Permissions</h3>
      </div>
      <div class="right">
        <div class="controls">
          <VButtons>
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
          </VButtons>
        </div>
      </div>
    </div>
    <div class="invoice-body">
      <div class="invoice-card" :class="{ 'is-loading': isLoading }">
        <VLoader :active="isLoading" size="large">
          <div class="invoice-section is-flex">
            <div class="groups-list">
              <div class="title">Groups</div>
              <ul>
                <li
                  v-for="group in groups"
                  :id="group.id"
                  :key="group.id"
                  :class="{ 'current-group': group.id == currentGroup }"
                  @click="currentGroup = group.id"
                  @keydown="currentGroup = group.id"
                >
                  {{ group.str_representation }}
                </li>
              </ul>
            </div>
            <div class="permissions-list">
              <div class="header">
                <div class="title">Permissions</div>
                <div class="search-bar">
                  <VField>
                    <VControl icon="feather:search">
                      <VInput
                        v-model="permissionsSearch"
                        type="text"
                        class="is-rounded"
                        placeholder="Search Permissions"
                      />
                    </VControl>
                  </VField>
                </div>
              </div>
              <VLoader :active="isPermissionsLoading" size="large">
                <ul v-if="permissions?.length !== 0" class="permissions-ul">
                  <li v-for="permission in permissions" :key="permission.id">
                    <VField class="is-flex">
                      <VControl raw subcontrol>
                        <VSwitchSegment
                          :aria-label="permission.id"
                          color="primary"
                          :model-value="
                            valuesToSubmit[currentGroup].has(permission.id) ? true : false
                          "
                          @change="updateResults"
                        />
                      </VControl> </VField
                    ><span>{{ permission.str_representation }}</span>
                  </li>
                </ul>
                <div v-else>
                  <VPlaceholderPage
                    title="We couldn't find any matching results."
                    subtitle="Too bad. Looks like we couldn't find any matching results for the search terms
            you've entered. Please try different search terms or criteria."
                    larger
                  >
                    <template #image>
                      <img
                        class="light-image"
                        src="/@src/assets/illustrations/placeholders/search-7.svg"
                        alt=""
                      />
                      <img
                        class="dark-image"
                        src="/@src/assets/illustrations/placeholders/search-7-dark.svg"
                        alt=""
                      />
                    </template>
                  </VPlaceholderPage>
                </div>
              </VLoader>
              <VFlexPagination
                v-if="totalPermissions > 5"
                v-model:current-page="currentPermissionsPage"
                :item-per-page="20"
                :total-items="totalPermissions"
                :max-links-displayed="2"
                no-router
              />
            </div>
          </div>
        </VLoader>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/abstracts/all';

.loading-placeload {
  margin: 25px 0;
}

.invoice-wrapper {
  max-width: 740px;

  &.is-navbar {
    margin-top: 30px;
  }

  .invoice-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--fade-grey-dark-4);

    .left {
      h3 {
        font-family: var(--font-alt);
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--dark-text);
      }
    }

    .right {
      .controls {
        display: flex;

        button,
        a {
          height: 35px;
        }
      }
    }
  }

  .invoice-body {
    .is-loading {
      padding: 10px 20px !important;

      .has-loader-active {
        height: 100px;
      }
    }

    .invoice-card {
      @include vuero-s-card;

      padding: 0;

      .invoice-section {
        color: var(--dark-dark-text);
        font-family: var(--font-alt);
        font-weight: 600;
        font-size: 0.95rem;

        .groups-list {
          border-right: 1px solid var(--fade-grey-dark-3);
          padding: 30px 20px;

          ul {
            margin-right: 80px;
            width: 100%;

            li {
              margin-bottom: 7px !important;

              &:not(.current-group) {
                &:hover {
                  background: var(--fade-grey-light-3);
                }
              }
            }

            .current-group {
              color: var(--primary);
              border-radius: 20px;
              box-shadow: var(--light-box-shadow);
              border: 1px solid var(--fade-grey-dark-3);
            }
          }
        }

        .permissions-list,
        .groups-list {
          .title {
            width: 100%;
            padding-left: 18px;
            font-size: 16px;
            margin-bottom: 20px;
          }

          min-width: 250px;

          > ul,
          .permissions-ul {
            li {
              margin-bottom: 18px;
              cursor: pointer;
              padding: 9px 20px;
              border-radius: 3px;
              width: 100%;
              transition: color 0.3s;
              border-radius: 20px;
            }

            li:last-child {
              margin-bottom: 0;
            }
          }
        }

        .permissions-list {
          width: 100%;
          padding: 30px 0;

          .permissions-loading {
            margin-left: 30px;
            width: 88%;
          }

          .header {
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px 0 0;

            .title {
              padding-left: 30px;
              position: relative;
              top: 9px;
              width: fit-content;
            }

            .search-bar {
              input {
                height: 32px;
              }

              label {
                top: -3px;
              }
            }
          }

          .has-loader-active {
            height: 100px;
          }

          .permissions-ul {
            li {
              display: flex;
              margin-bottom: 0px;
              padding-bottom: 0;
              display: flex;

              span {
                margin-top: 3px;
              }
            }
          }

          .pagination {
            margin: 13px 27px 0;
          }
        }

        &.is-flex {
          display: flex;
          align-items: stretch;
        }

        &.is-bordered {
          border-bottom: 1px solid var(--fade-grey-dark-3);
        }
      }
    }
  }
}

/* ==========================================================================
5. Invoice Dark mode
========================================================================== */

.is-dark {
  .invoice-wrapper {
    .invoice-header {
      border-color: var(--dark-sidebar-light-20);

      .left {
        h3 {
          color: var(--dark-dark-text);
        }
      }

      .right {
        .controls {
          .action {
            border: 1px solid transparent;

            &:hover,
            &:focus {
              background: var(--dark-sidebar-light-2);
              border-color: var(--primary);
              color: var(--primary);
            }
          }
        }
      }
    }

    .invoice-body {
      .invoice-card {
        @include vuero-card--dark;
      }
    }

    .invoice-section {
      border-color: var(--dark-sidebar-light-12) !important;

      .groups-list {
        border-color: var(--dark-sidebar-light-12) !important;

        li {
          &:not(.current-group) {
            &:hover {
              background: var(--dark-sidebar-light-10) !important;
            }
          }
        }

        .current-group {
          background: var(--dark-sidebar-light-8);
          border-color: var(--dark-sidebar-light-12) !important;
        }
      }

      &.is-flex {
        .v-avatar {
          border-color: var(--dark-sidebar-light-12) !important;
        }

        .meta,
        .end {
          h3 {
            color: var(--dark-dark-text);
          }
        }
      }
    }
  }
}

@media only screen and (width <= 767px) {
  .invoice-wrapper {
    .invoice-section {
      &.is-flex {
        flex-direction: column;
        text-align: center;

        .v-avatar {
          margin-bottom: 16px;
        }

        .meta {
          margin-inline-start: 0 !important;
        }

        .end {
          margin: 16px auto 0;
          text-align: center !important;
        }
      }

      .flex-table {
        .flex-table-item {
          .flex-table-cell {
            &.is-grow {
              > span {
                margin-inline-start: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>