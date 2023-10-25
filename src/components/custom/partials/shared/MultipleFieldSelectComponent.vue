<script setup lang="ts">
import { useFieldSelect } from '/@src/stores/fieldTypeSelect'

const props = defineProps<{
  schemaField: object
  setFieldValue: void
  modalName: string
}>()

const emits = defineEmits<{
  (e: 'showCreatePopup', data): void
}>()

const fieldSelect = useFieldSelect()
const fieldsData = fieldSelect.fieldsTypeData[props.modalName]
</script>

<template>
  <div class="custom-dropdown" :class="{ 'is-open': fieldsData[schemaField.id].isOpen }">
    <div
      class="dropdown-result"
      @click.once="fieldSelect.setFieldChoices(schemaField, modalName)"
      @click="fieldSelect.toggleSelect(schemaField, modalName)"
      @keypress="fieldSelect.toggleSelect(schemaField, modalName)"
    >
      <span v-if="fieldsData[schemaField.id].selectedItem.length === 0">{{
        schemaField.label
      }}</span>
      <div v-else>
        <VTags
          v-for="option in fieldsData[schemaField.id].selectedItem"
          :key="option.value"
          addons
        >
          <VTag :label="option.display_name" color="primary" />
          <VTag
            remove
            @mousedown="
              fieldSelect.removeItem(option, schemaField, setFieldValue, modalName)
            "
          />
        </VTags>
      </div>
    </div>
    <a
      v-if="!fieldsData[schemaField.id].permissions.toAdd"
      v-tooltip.top.left.warning.rounded="
        `You are not allowed to create a new ${schemaField.label} instance`
      "
      class="new-instance-button disabled"
    >
      <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
    </a>
    <a
      v-else
      class="new-instance-button"
      @click.stop="
        $emit('showCreatePopup', {
          formSchema: fieldsData[schemaField.id].createSchema,
          nextEndpointUrl: schemaField.endpoint_url,
          label: schemaField.label,
          fieldId: schemaField.id,
        })
      "
      @keydown.stop="
        $emit('showCreatePopup', {
          formSchema: fieldsData[schemaField.id].createSchema,
          nextEndpointUrl: schemaField.endpoint_url,
          label: schemaField.label,
          fieldId: schemaField.id,
        })
      "
    >
      <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
    </a>
    <div class="dropdown-container">
      <div class="dropdown-header">
        <input
          class="input"
          :type="schemaField.html_input_type"
          :placeholder="`Search ${schemaField.label}`"
          @input="
            fieldSelect.filteredItems($event, schemaField, setFieldValue, modalName)
          "
        />
      </div>
      <ul class="dropdown-list">
        <div v-if="fieldSelect.fieldOptionsLoading" class="dropdown-loader">
          <VPlaceload />
        </div>
        <div
          v-else-if="fieldsData[schemaField.id].options.length === 0"
          class="no-options"
        >
          No Records Match
        </div>
        <div v-else>
          <li
            v-for="item in fieldsData[schemaField.id].options"
            :key="item.value"
            @mousedown="
              fieldSelect.selectItem(item, schemaField, setFieldValue, true, modalName)
            "
          >
            <VIconBox
              v-if="fieldsData[schemaField.id].selectedItem.includes(item)"
              size="medium"
              color="success"
              rounded
              class="selected-option"
            >
              <i class="iconify" data-icon="feather:check"></i>
            </VIconBox>

            {{ item.display_name }}
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.custom-dropdown {
  position: relative;
  display: block;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 8px;
  height: auto;
  font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial',
    sans-serif;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .dropdown-result {
    width: 100%;
    min-height: 2.7rem;
    max-height: 38px;
    background: var(--white);
    font-size: 13px;
    font-family: inherit;
    padding: calc(0.7em - 1px) 38px 9px;
    border-radius: 6px 6px 0 0;

    > div {
      display: flex;
      align-items: center;
      top: -2.5px;
      position: relative;

      .tags {
        margin-bottom: 0 !important;
        margin-right: 8px;
      }
    }
  }

  .dropdown-container {
    display: none;
    position: relative;
    z-index: 5;
    background: var(--white);
    width: 100%;
    max-height: 120px;
    border-radius: 0px;
    padding: 14px 10px;

    .dropdown-header {
      input {
        padding-left: 15px;
        height: 32px;
        font-size: 12.5px;
      }
    }

    .dropdown-list {
      position: absolute;
      top: 100%;
      left: 0;
      list-style: none;
      background: var(--white);
      width: 100%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

      .dropdown-loader,
      .no-options {
        padding: 10px 10px 10px 25px;
        font-size: 12.5px;
        cursor: auto;
      }

      .no-options {
        font-weight: bold;
      }

      li {
        padding: 5px 5px 5px 15px;
        cursor: pointer;
        color: hsl(0deg, 0%, 21%);
        margin: 8px 8px 8px 14px;
        font-size: 13px;
        display: flex;
        align-items: center;

        .selected-option {
          width: 17px;
          height: 17px;
          margin-right: 4px;
          min-width: 0px;

          svg {
            width: 14px;
            height: 14px;
          }
        }

        &:hover {
          background-color: var(--primary);
          box-sizing: border-box;
          border-radius: 7px;
          border: 1px solid var(--primary);
        }
      }
    }
  }

  &.is-open {
    .dropdown-container {
      display: block;
    }
  }
}

.field-type-container {
  display: flex;

  .field-type-search {
    margin-right: 5px;
  }
}

.is-dark {
  .new-instance-button {
    background: var(--dark-sidebar-light-10);
  }

  .dropdown-result,
  .dropdown-container,
  .dropdown-list {
    background: var(--dark-sidebar-light-10) !important;
  }

  .dropdown-list li {
    color: var(--primary--color-invert) !important;
  }
}
</style>