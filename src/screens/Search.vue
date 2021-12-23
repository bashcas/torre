<template>
  <div>
    <EditText
      placeholder="Search people on Torre"
      @text-changed="queryPeople($event)"
    />

    <div class="search-results">
      <div v-if="loading" class="loading-container">
        <Loading />
      </div>

      <div v-else-if="error">
        <ErrorMessage :error="error" />
      </div>

      <div v-else>
        <div v-if="results.length === 0">
          <div class="no-results">
            <p>No results found</p>
          </div>
        </div>
        <div v-else>
          <ul class="user-list">
            <UserResult
              v-for="user in results"
              :key="user.username"
              :user="user"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditText from "../components/EditText.vue"
import Loading from "../components/Loading.vue"
import ErrorMessage from "../components/ErrorMessage.vue"
import UserResult from "../components/UserResult.vue"
import { searchPeople } from "../api"
import axios from "axios"

export default {
  name: "Search",
  components: {
    EditText,
    Loading,
    ErrorMessage,
    UserResult,
  },

  data() {
    return {
      results: [],
      previousPage: null,
      nextPage: null,
      loading: false,
      error: null,
      //Cancel token is required as we are making multiple requests and this can lead to inconsistent results
      cancelToken: undefined,
    }
  },

  methods: {
    async queryPeople(query) {
      //check if there are any pending requests
      if (typeof this.cancelToken != typeof undefined) {
        this.cancelToken.cancel("Operation canceled due to new requests.")
      }

      const payload = {
        name: {
          term: query,
        },
      }

      // Save the cancel token for the next request
      this.cancelToken = axios.CancelToken.source()

      try {
        this.loading = true
        const data = await searchPeople(payload, this.cancelToken)
        this.results = data.results
        this.previousPage = data.pagination.previous
        this.nextPage = data.pagination.next
        this.loading = false
        this.error = false
      } catch (error) {
        this.error = true
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.search-results {
  margin-top: 20px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.no-results {
  margin-top: 20px;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
