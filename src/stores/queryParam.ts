import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useQueryParam = defineStore('queryParam', () => {
  const route = useRoute()
  const router = useRouter()

  const defaultPage = 1
  const defaultSearch = ''
  const defaultFilters = ''
  const defaultSort = ''

  const searchTerm = computed({
    get() {
      return route.query.search ?? defaultSearch
    },
    set(value) {
      router.push({
        query: {
          search: value === defaultSearch ? undefined : value,
          filter: filtersTerm.value === defaultFilters ? undefined : filtersTerm.value,
          page: page.value === defaultPage ? undefined : page.value,
          sort: sort.value === defaultSort ? undefined : sort.value,
        },
      })
    },
  })

  const filtersTerm = computed({
    get() {
      return route.query.filter
    },
    set(value) {
      router.push({
        query: {
          filter: value === defaultFilters ? undefined : value,
          search: searchTerm.value === defaultSearch ? undefined : searchTerm.value,
          page: page.value === defaultPage ? undefined : page.value,
          sort: sort.value === defaultSort ? undefined : sort.value,
        },
      })
    },
  })

  const sort = computed({
    get() {
      return route.query.sort ?? defaultSort
    },
    set(value) {
      router.push({
        query: {
          sort: value === defaultSort ? undefined : value,
          page: page.value === defaultPage ? undefined : page.value,
          filter: filtersTerm.value === defaultFilters ? undefined : filtersTerm.value,
          search: searchTerm.value === defaultSearch ? undefined : searchTerm.value,
        },
      })
    },
  })

  const page = computed({
    get() {
      return route.query.page ? parseInt(route.query.page) : parseInt(defaultPage)
    },
    set(value) {
      router.push({
        query: {
          page: value === defaultPage ? undefined : value,
          filter: filtersTerm.value === defaultFilters ? undefined : filtersTerm.value,
          search: searchTerm.value === defaultSearch ? undefined : searchTerm.value,
          sort: sort.value === defaultSort ? undefined : sort.value,
        },
      })
    },
  })

  return {
    page,
    searchTerm,
    filtersTerm,
    sort,
  }
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQueryParam, import.meta.hot))
}
