import { useHandleTimeEntries } from '/@src/stores/handleTimeEntries'

export function IncrementListedRunningInstances() {
  const handleTimeEntries = useHandleTimeEntries()

  for (const recordIndex in handleTimeEntries.runningTimeEntries) {
    const record = handleTimeEntries.runningTimeEntries[recordIndex]

    const second = 1 / 3600
    const incrementedHours = Number.parseFloat(record['hours'] as string) + second

    handleTimeEntries.runningTimeEntries[recordIndex]['hours'] = incrementedHours
  }
}

export function toggleTimeEntryLocally(instance: object) {
  const handleTimeEntries = useHandleTimeEntries()

  for (const recordIndex in handleTimeEntries.allTimeEntries) {
    const record = handleTimeEntries.allTimeEntries[recordIndex]

    if (record.id == instance.id) {
      record['is_counting']
        ? (handleTimeEntries.allTimeEntries[recordIndex]['is_counting'] = false)
        : (handleTimeEntries.allTimeEntries[recordIndex]['is_counting'] = true)

      handleTimeEntries.updateRunningTimeEntries()
      return record['is_counting'] ? 'Counter Started' : 'Counter Stoped'
    }
  }
}

export function getCorrectCounterIcon(isCounting: boolean) {
  return isCounting ? 'feather:pause' : 'feather:play'
}
