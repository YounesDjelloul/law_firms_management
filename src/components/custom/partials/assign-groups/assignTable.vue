<script setup lang="ts">
const props = defineProps<{
  tableRows: []
  tableColumns: []
  updateResults
  rowsHeader: string
  results: object
}>()
</script>

<template>
  <table class="table is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th scope="col">{{ rowsHeader }}</th>
        <th v-for="column in tableColumns" :key="column.id" scope="col">
          {{ column.str_representation }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in tableRows" :key="row.id">
        <td>
          {{ row.str_representation }}
        </td>

        <td v-for="col in tableColumns" :key="col.id">
          <VField class="is-flex">
            <VControl raw subcontrol>
              <VSwitchSegment
                color="primary"
                :model-value="results[row.id].has(col.id) ? true : false"
                @update:model-value="(status) => updateResults(row.id, col.id, status)"
              />
            </VControl>
          </VField>
        </td>
      </tr>
    </tbody>
  </table>
</template>