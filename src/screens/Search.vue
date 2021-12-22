<template>
  <EditText
    :text="search"
    placeholder="Search people on Torre"
    @text-changed="queryPeople($event)"
  />
</template>

<script>
import EditText from "../components/EditText.vue"
import { searchPeople } from "../api"

export default {
  name: "Search",
  components: {
    EditText,
  },

  data() {
    return {
      search: "",
      searchResults: [],
      previousPage: null,
      nextPage: null,
    }
  },

  methods: {
    async queryPeople(query) {
      const payload = {
        name: {
          term: query,
        },
      }
      try {
        const data = await searchPeople(payload)
        console.log(data)
        this.searchResults = data.results
        this.previousPage = data.pagination.previous
        this.nextPage = data.pagination.next
      } catch (error) {
        console.log(error)
      }
    },
  },

  watch: {
    search(newSearch) {
      console.log(newSearch)
    },
  },
}
</script>
