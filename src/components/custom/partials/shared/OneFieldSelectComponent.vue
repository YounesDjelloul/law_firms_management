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
    <div>
      <input
        v-model="fieldsData[schemaField.id].typed"
        class="input single-select-input"
        :type="schemaField.html_input_type"
        :placeholder="`Search ${schemaField.label}`"
        @input="fieldSelect.filteredItems($event, schemaField, setFieldValue, modalName)"
        @click.once="fieldSelect.setFieldChoices(schemaField, modalName)"
        @click="fieldSelect.toggleSelect(schemaField, modalName)"
        @blur="fieldsData[schemaField.id].isOpen = false"
      />
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
            :key="item"
            @mousedown="
              fieldSelect.selectItem(item, schemaField, setFieldValue, false, modalName)
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
.dropdown-container {
  padding: 5px 10px !important;
}

.single-select-input {
  font-size: 13.5px;
}

.new-instance-button {
  position: absolute;
  right: -48px;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 38px;
  min-width: 32px;
  border-radius: var(--radius-rounded) !important;
  background: var(--white);
  border: 1px solid var(--border);
  color: var(--light-text) !important;
  margin: 0 4px;
  transition: all 0.3s;

  &.disabled {
    svg {
      opacity: 0.5;
    }
  }

  &:hover:not(.disabled) {
    color: var(--white) !important;
    background: var(--primary) !important;
  }

  svg {
    height: 16px;
    width: 16px;
    stroke-width: 1.6px;
  }
}
</style>