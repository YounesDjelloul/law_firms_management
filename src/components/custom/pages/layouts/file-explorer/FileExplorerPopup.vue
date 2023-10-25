<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'
import { useHandleCurrentComponent } from '/@src/stores/handleCurrentComponent'

const props = defineProps<{
  modalTitle: string
}>()

const handleInstance = useHandleCurrentComponent()
const backendUrl = API_URLs.VUE_FINDER

onMounted(() => {
  const container = document.querySelector('.vf-selector-area')

  container.addEventListener(
    'contextmenu',
    function (e) {
      e.preventDefault()

      const contextmenu = document.querySelector('.z-30')
      const containerCords = container.getBoundingClientRect()

      const x = e.pageX - containerCords.x + 20
      const y = e.y - 24

      contextmenu.style.left = x + 'px'
      contextmenu.style.top = y + 'px'
      return false
    },
    false
  )
})
</script>

<template>
  <VModal
    :open="true"
    :title="modalTitle"
    size="big"
    actions="right"
    noscroll
    @close="handleInstance.showFolderExplorerPopup = false"
  >
    <template #content>
      <VueFinder id="my_vuefinder" :url="backendUrl" :dark="true"></VueFinder>
    </template>
  </VModal>
</template>