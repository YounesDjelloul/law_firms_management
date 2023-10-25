<script setup lang="ts">
import API_URLs from '/@src/constants/api/urls'

const backendUrl = API_URLs.VUE_FINDER

onMounted(() => {
  const container = document.querySelector('.vf-selector-area')

  container.addEventListener(
    'contextmenu',
    function (e) {
      e.preventDefault()

      const containerCords = container.getBoundingClientRect()
      const contextmenu = document.querySelector('.z-30')

      const x = e.pageX - containerCords.x
      const y = e.pageY - 81

      contextmenu.style.left = x + 'px'
      contextmenu.style.top = y + 'px'
      return false
    },
    false
  )
})
</script>

<template>
  <vue-finder id="my_vuefinder" :url="backendUrl" :dark="true" />
</template>