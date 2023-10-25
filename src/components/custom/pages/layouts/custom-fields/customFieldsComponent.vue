<script setup lang="ts">
import { useHandleInstance } from '/@src/stores/handleInstance'
import { useUserSession } from '/@src/stores/userSession'
import { useQueryParam } from '/@src/stores/queryParam'
import { useHandleTimeEntries } from '/@src/stores/handleTimeEntries'

import { timeEntriesHelpers, tables, formatting, shared } from '/@src/utils/app'
import { models } from '/@src/services/api'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  componentDependencies: object
}>()

const { endpointUrl, headings, permissions } = props.componentDependencies

const route = useRoute()

const handleInstance = useHandleInstance()
const queryParam = useQueryParam()

watchEffect(async () => {
  handleInstance.setStateData([])
  handleInstance.isLoading = true

  let { searchTerm, filtersTerm, page, sort } = queryParam

  const pageQuery = `page=${page}`
  let searchFilterQuery = ''
  let sortQuery = ''

  if (searchTerm) {
    searchFilterQuery = `search=${searchTerm}&`
  } else if (filtersTerm) {
    searchFilterQuery = `${filtersTerm}&`
  }

  if (sort) {
    const formattedSort = formatting.FormatingOrderingParam(sort)
    sortQuery = `ordering=${formattedSort}&`
  }

  const endpointRoute = `?${sortQuery}${searchFilterQuery}${pageQuery}`
  const { results, count } = await models.getInstances(endpointUrl, endpointRoute)

  handleInstance.setStateData(results)
  handleInstance.dataLength = count

  handleInstance.isLoading = false
})

const { toAdd, toChange, toDelete } = await tables.getAddUpdateDeletePermissions(
  permissions
)
</script>

<template>
  <div>
    <CreateCustomFieldComponent
      v-if="handleInstance.showCreateInstancePopup && toAdd"
      :modal-name="route.meta.name"
    />

    <ViewInstanceComponent
      v-if="handleInstance.showViewInstanceDetailsPopup"
      :modal-title="`${route.meta.name} Details`"
    />
    <UpdateCustomFieldComponent
      v-if="handleInstance.showUpdateInstancePopup && toChange"
      :modal-name="route.meta.name"
    />
    <DeleteInstanceComponent
      v-if="handleInstance.showDeleteInstancePopup && toDelete"
      :modal-title="`Delete ${route.meta.name}`"
    />

    <FilterListComponent
      v-if="handleInstance.showFilterInstancesPopup"
      :modal-name="route.meta.name"
    />

    <FileExplorerPopup
      v-if="handleInstance.showFolderExplorerPopup"
      modal-title="Explore Folder"
    />
    <div class="datatable-toolbar">
      <VField>
        <VControl icon="feather:search">
          <input
            v-model="queryParam.searchTerm"
            class="input custom-text-filter"
            placeholder="Search..."
          />
        </VControl>
      </VField>

      <VButtons>
        <VButton
          color="primary"
          icon="feather:settings"
          outlined
          @click="handleInstance.showFilterInstancesPopup = true"
          >Filters</VButton
        >
        <VButton
          :disabled="toAdd ? false : true"
          color="primary"
          icon="feather:plus"
          elevated
          @click="handleInstance.getCreateInstancePopup()"
        >
          Create Record
        </VButton>
      </VButtons>
    </div>
    <div class="datatable-wrapper">
      <VLoader :active="handleInstance.isLoading" size="large">
        <div v-if="handleInstance.isLoading" class="placeholder-loader"></div>
        <div v-else class="table-container">
          <table class="table datatable-table is-fullwidth">
            <thead>
              <th
                v-for="head in headings"
                :key="head.key"
                :class="{ 'is-sortable': head.orderable }"
                :sortable="head.orderable"
                @click="tables.sortData"
              >
                {{ head.display_name }}
                <span v-if="head.orderable" class="is-inline">
                  <svg
                    v-if="
                      tables.getSortQuery()[0] == head.key &&
                      tables.getSortQuery()[1] == 'asc'
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="0.63em"
                    height="1em"
                    viewBox="0 0 320 512"
                    data-icon="fa6-solid:sort-up"
                    class="ml-3 iconify is-inline iconify--fa6-solid"
                  >
                    <path
                      fill="currentColor"
                      d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9S19 224.1 32 224.1h256c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                    ></path>
                  </svg>

                  <svg
                    v-else-if="
                      tables.getSortQuery()[0] == head.key &&
                      tables.getSortQuery()[1] == 'desc'
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="0.63em"
                    height="1em"
                    viewBox="0 0 320 512"
                    data-icon="fa6-solid:sort-down"
                    class="ml-3 iconify is-inline iconify--fa6-solid"
                  >
                    <path
                      fill="currentColor"
                      d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19 287.9 32 287.9h256c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
                    ></path>
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="0.63em"
                    height="1em"
                    viewBox="0 0 320 512"
                    data-icon="fa6-solid:sort"
                    class="ml-3 iconify is-inline iconify--fa6-solid"
                  >
                    <path
                      fill="currentColor"
                      d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301 224.1 288 224.1H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19.1 288 32.1 288H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"
                    ></path>
                  </svg>
                </span>
              </th>
            </thead>
            <tbody>
              <tr v-for="record in handleInstance.currentStateData" :key="record.id">
                <td v-for="col in headings" :key="col.key">
                  <VAvatar
                    v-if="col.media"
                    class="media-cell"
                    :picture="shared.flattenObj(record)[col.data]"
                  />
                  <TableActionsDropdown
                    v-else-if="col.data == 'Actions'"
                    :to-change="toChange"
                    :to-delete="toDelete"
                    :instance="record"
                  />
                  <span v-else>{{ shared.flattenObj(record)[col.data] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </VLoader>
      <VPlaceholderPage
        v-if="handleInstance.dataLength === 0 && !handleInstance.isLoading"
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

    <!--Table Pagination-->
    <VFlexPagination
      v-if="handleInstance.dataLength > 5"
      v-model:current-page="queryParam.page"
      :item-per-page="handleInstance.itemPerPage"
      :total-items="handleInstance.dataLength"
      :max-links-displayed="5"
      no-router
      class="mt-4"
      @update:current-page="queryParam.page"
    />
  </div>
</template>

<style lang="scss" scoped>
.timer-button {
  left: 0px !important;
}

.is-navbar {
  .datatable-toolbar {
    padding-top: 30px;
  }
}

.datatable-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &.is-reversed {
    flex-direction: row-reverse;
  }

  .field {
    margin-bottom: 0;

    .control {
      .button {
        color: var(--light-text);

        &:hover,
        &:focus {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--primary--color-invert);
        }
      }
    }
  }

  .buttons {
    margin-left: auto;
    margin-bottom: 0;

    .v-button {
      margin-bottom: 0;
    }
  }
}

.is-dark {
  .datatable-toolbar {
    .field {
      .control {
        .button {
          background: var(--dark-sidebar) !important;
          color: var(--light-text);

          &:hover,
          &:focus {
            background: var(--primary) !important;
            border-color: var(--primary) !important;
            color: var(--smoke-white) !important;
          }
        }
      }
    }
  }
}

.datatable-wrapper {
  width: 100%;

  .datatable-container {
    background: var(--white);
    border: none !important;
    overflow-x: auto;

    .table,
    table {
      width: 100%;
    }

    &::-webkit-scrollbar {
      height: 8px !important;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px !important;
      background: rgb(0 0 0 / 20%) !important;
    }
  }
}

.datatable-table {
  border: 1px solid var(--fade-grey);
  border-collapse: collapse;
  border-radius: 0.75rem;

  th {
    padding: 16px 20px;
    font-family: var(--font-alt);
    font-size: 0.8rem;
    color: var(--dark-text);
    text-transform: uppercase;
    border: 1px solid var(--fade-grey);
    font-weight: 600;

    &:last-child {
      text-align: right;
    }

    &.is-sortable {
      cursor: pointer !important;
    }
  }

  td {
    font-family: var(--font);
    vertical-align: middle;
    padding: 12px 20px;
    border-bottom: 1px solid var(--fade-grey);

    &:last-child {
      text-align: right;
    }

    &.datatables-empty {
      opacity: 0;
    }
  }

  .light-text {
    color: var(--light-text);
  }

  .flex-media {
    display: flex;
    align-items: center;

    .meta {
      margin-left: 10px;
      line-height: 1.3;

      span {
        display: block;
        font-size: 0.8rem;
        color: var(--light-text);
        font-family: var(--font);

        &:first-child {
          font-family: var(--font-alt);
          color: var(--dark-text);
        }
      }
    }
  }

  .row-action {
    display: flex;
    justify-content: flex-end;
  }

  .checkbox {
    padding: 0;
  }

  .product-photo {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .file-icon {
    width: 46px;
    height: 46px;
    object-fit: contain;
  }

  .drinks-icon {
    display: block;
    max-width: 48px;
    border-radius: var(--radius-rounded);
    border: 1px solid var(--fade-grey);
  }

  .negative-icon,
  .positive-icon {
    svg {
      height: 16px;
      width: 16px;
    }
  }

  .positive-icon {
    .iconify {
      color: var(--success);

      * {
        stroke-width: 4px;
      }
    }
  }

  .negative-icon {
    &.is-danger {
      .iconify {
        color: var(--danger) !important;
      }
    }

    .iconify {
      color: var(--light-text);

      * {
        stroke-width: 4px;
      }
    }
  }

  .price {
    color: var(--dark-text);
    font-weight: 500;

    &::before {
      content: '$';
    }

    &.price-free {
      color: var(--light-text);
    }
  }

  .status {
    display: flex;
    align-items: center;

    &.is-available {
      i {
        color: var(--success);
      }
    }

    &.is-busy {
      i {
        color: var(--danger);
      }
    }

    &.is-offline {
      i {
        color: var(--light-text);
      }
    }

    i {
      margin-right: 8px;
      font-size: 8px;
    }

    span {
      font-family: var(--font);
      font-size: 0.9rem;
      color: var(--light-text);
    }
  }
}

.is-dark {
  .datatable-wrapper {
    .datatable-container {
      border-color: var(--dark-sidebar-light-12);
      background: var(--dark-sidebar-light-6);
    }
  }

  .datatable-table {
    border-color: var(--dark-sidebar-light-12);

    th,
    td {
      border-color: var(--dark-sidebar-light-12);
      color: var(--dark-dark-text);
    }

    .drinks-icon {
      border-color: var(--dark-sidebar-light-12);
    }
  }
}
</style>
