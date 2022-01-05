<template>
  <div class="modal">
    <p>
      Please type your user to get more relevant results. If you don't know your
      user you can get it
      <a href="https://accounts.torre.co/user/" target="_blank">here</a>
    </p>

    <EditText
      placeholder="username"
      @keyup="handleKeyUp"
      @text-changed="updateUsername($event)"
    />
    <Button @click="login" class="button">Login</Button>

    <ProfilePicture
      v-if="welcomeMessage"
      :img="img"
      :size="100"
    ></ProfilePicture>
    <p class="welcome" v-if="welcomeMessage">
      Welcome <span>{{ name }}</span>
    </p>

    <Loading v-if="loading" />

    <hr class="line" />

    <p @click="this.$router.push('/search')" class="continue">
      Continue without login
    </p>

    <p class="error" v-if="error">User not found</p>
  </div>
</template>

<script>
import { getUserByUsername } from "../api"
import EditText from "../components/EditText.vue"
import Button from "../components/Button.vue"
import Loading from "../components/Loading.vue"
import ProfilePicture from "../components/ProfilePicture.vue"
export default {
  name: "Login",

  components: {
    EditText,
    Button,
    Loading,
    ProfilePicture,
  },

  data() {
    return {
      username: "",
      name: "",
      img: "",
      error: false,
      loading: false,
      welcomeMessage: false,
    }
  },

  methods: {
    async handleKeyUp(event) {
      if (event.key === "Enter") {
        try {
          await this.login()
        } catch (e) {
          this.error = true
        }
      }
    },

    updateUsername(text) {
      this.username = text
    },

    async login() {
      this.loading = true
      const response = await getUserByUsername(this.username)
      this.img = response.person.picture
      const ggid = response.person.ggId
      localStorage.setItem("ggid", ggid)
      localStorage.setItem("name", response.person.name)
      this.name = response.person.name

      this.error = false
      this.welcomeMessage = true
      setTimeout(() => {
        this.loading = false
        this.$router.push("/search")
      }, 2000)
    },
  },

  created() {
    if (localStorage.getItem("ggid")) {
      this.$router.push("/search")
    }
  },
}
</script>

<style scoped>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--secondary-color);
  color: var(--on-secondary);
  font-size: 1.8rem;
  font-weight: 400;
  padding: 20px;
  border-radius: 5px;
  line-height: 1.5;
}

.modal p {
  display: inline;
}
.modal a {
  color: var(--primary-color);
  text-decoration: none;
  display: inline;
}

.modal p {
  margin-bottom: 20px;
}

.modal a:hover {
  color: var(--primary-color-light);
  text-decoration: underline;
}

.welcome {
  margin-top: 20px;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--on-secondary-light);
}

.welcome span {
  color: var(--primary-color);
}

.error {
  color: var(--error-color);
  margin-top: 10px;
  font-size: 1.6rem;
}

.line {
  width: 100%;
  margin: 20px 0 10px 0;
}

.button {
  margin: 20px 0;
}

.continue {
  margin-top: 10px;
  text-align: center;
  font-size: 1.4rem;
  color: var(--on-secondary-light);
  cursor: pointer;
}
.continue:hover {
  color: var(--on-secondary-dark);
}
</style>
