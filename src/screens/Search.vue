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
            <li v-for="user in results" :key="user.username">
              <UserResult :user="user" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="controls" v-if="results.length > 0 && !loading">
      <Button @click="goToPreviousPage"
        ><span class="material-icons">arrow_back</span></Button
      >
      <p class="page-number">
        {{ offset + 1 }} - {{ offset + size }} of around {{ total }}
      </p>
      <Button @click="goToNextPage"
        ><span class="material-icons">arrow_forward</span></Button
      >
    </div>
  </div>
</template>

<script>
import EditText from "../components/EditText.vue"
import Loading from "../components/Loading.vue"
import ErrorMessage from "../components/ErrorMessage.vue"
import UserResult from "../components/UserResult.vue"
import Button from "../components/Button.vue"
import { searchPeople, getNextPage, getPreviousPage } from "../api"
import axios from "axios"

export default {
  name: "Search",
  components: {
    EditText,
    Loading,
    ErrorMessage,
    UserResult,
    Button,
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
      search: "",
      offset: 0,
      total: 0,
      size: 10,
    }
  },

  methods: {
    async queryPeople(query) {
      //check if there are any pending requests
      if (typeof this.cancelToken != typeof undefined) {
        this.cancelToken.cancel("Operation canceled due to new requests.")
      }
      this.search = query
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
        this.updatePagination(
          data.results,
          data.pagination.previous,
          data.pagination.next,
          data.offset,
          data.size,
          data.total
        )
        this.loading = false
        this.error = false
      } catch (error) {
        this.error = true
        console.log(error)
      }
    },

    async goToNextPage() {
      if (!this.nextPage) {
        return
      }

      const payload = {
        name: {
          term: this.search,
        },
      }

      try {
        this.loading = true
        const data = await getNextPage(payload, this.nextPage)
        this.updatePagination(
          data.results,
          data.pagination.previous,
          data.pagination.next,
          data.offset,
          data.size,
          data.total
        )
        this.loading = false
        this.error = false
      } catch (error) {
        this.error = true
        console.log(error)
      }
    },

    async goToPreviousPage() {
      if (!this.previousPage) {
        return
      }

      const payload = {
        name: {
          term: this.search,
        },
      }

      try {
        this.loading = true
        const data = await getPreviousPage(payload, this.previousPage)
        this.updatePagination(
          data.results,
          data.pagination.previous,
          data.pagination.next,
          data.offset,
          data.size,
          data.total
        )
        this.loading = false
        this.error = false
      } catch (error) {
        this.error = true
        console.log(error)
      }
    },

    updatePagination(results, previousPage, nextPage, offset, size, total) {
      this.results = results
      this.previousPage = previousPage
      this.nextPage = nextPage
      this.offset = offset
      this.size = size
      this.total = total
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

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.page-number {
  color: var(--secondary-color-light);
  font-size: 1.4rem;
}
</style>
