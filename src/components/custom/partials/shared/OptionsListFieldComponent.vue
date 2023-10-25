<script setup lang="ts">
const props = defineProps<{
  fieldSchema: object
  setFieldValue: void
  setFieldError?: void
  values?: object
}>()

const { id: fieldId } = props.fieldSchema
const result = ref([])
const optionToShowDeleteButton = ref()

watchEffect(() => {
  if (props.values.html_input_type !== 'select') {
    props.setFieldValue(fieldId, undefined)
  }
})

watch(
  result,
  (newVal) => {
    newVal = newVal.filter((option) => option.value && option.display_name)
    newVal.length == 0
      ? props.setFieldValue(fieldId, undefined)
      : props.setFieldValue(fieldId, newVal)
  },
  { deep: true }
)

const addNewOption = () =>
  result.value.push({ value: undefined, display_name: undefined })
const deleteOption = (index: number) => result.value.splice(index - 1, 1)
</script>

<template>
  <div class="container">
    <div v-if="values.html_input_type !== 'select'" class="blured-background">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime quibusdam, sunt
    </div>
    <div v-if="values.html_input_type !== 'select'" class="blured-background-text">
      Options field is only available for "SELECT" type
    </div>
    <div v-else>
      <div class="field-header">
        <span class="options-created">{{ result.length }} options created</span>
      </div>
      <div class="field-body">
        <div
          v-for="op in result.length"
          :key="op"
          class="option"
          @mouseenter="optionToShowDeleteButton = op"
          @mouseleave="optionToShowDeleteButton = undefined"
          @focus="optionToShowDeleteButton = op"
          @blur="optionToShowDeleteButton = undefined"
        >
          <div>
            <input
              v-model="result[op - 1].value"
              class="input"
              :class="{ 'is-errored': !result[op - 1].value }"
              type="text"
              placeholder="option's value"
              data-type="value"
              :index="op"
              @keyup="handleDataEntering"
            />
            <p v-if="!result[op - 1].value" class="help is-danger">
              Option's value cannot be empty
            </p>
          </div>
          <div>
            <input
              v-model="result[op - 1].display_name"
              class="input"
              :class="{ 'is-errored': !result[op - 1].display_name }"
              type="text"
              placeholder="option's display_name"
              data-type="display_name"
              :index="op"
              @keyup="handleDataEntering"
            />
            <p v-if="!result[op - 1].display_name" class="help is-danger">
              Option's display_name cannot be empty
            </p>
          </div>
          <a
            v-if="optionToShowDeleteButton == op"
            @click="deleteOption(op)"
            @keydown="deleteOption(op)"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
          </a>
        </div>
        <span class="add-button">
          <VTag
            color="primary"
            label="Add Option"
            curved
            outlined
            @click="addNewOption"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 15px;
  display: flex;
  flex-direction: column;

  .blured-background {
    filter: blur(8px);
    -webkit-filter: blur(8px);
    width: 100%;
    height: 100%;
    color: black;
  }
  .blured-background-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }

  .field-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .options-created {
      font-family: var(--font);
      font-size: 0.9rem;
      color: var(--light-text) !important;
    }
  }

  .field-body {
    margin-top: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;

    .add-button {
      cursor: pointer;
      margin: 0 auto;
    }

    .option {
      width: 100%;
      display: flex;
      align-items: center;

      > a {
        width: 25px;
        height: 25px;
        margin-left: 10px;
        display: flex;
        align-items: center;

        .iconify {
          color: var(--danger--dark-color);
          cursor: pointer;
        }
      }

      > div {
        position: relative;

        .input {
          padding-left: 15px;
        }

        .is-errored {
          border: 1px solid var(--danger);
        }

        .help {
          position: absolute;
        }
      }

      > div:first-child {
        margin-right: 9px;
      }
    }

    .option:not(:last-child) {
      margin-bottom: 25px;
    }
  }
}
</style>