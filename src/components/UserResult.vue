<template>
  <div class="container" @click="goToProfile">
    <ProfilePicture :img="user.picture" :size="50" class="profile__picture" />
    <div class="profile__info">
      <h2 class="profile__name">{{ user.name }}</h2>
      <p class="profile__headline">{{ user.professionalHeadline }}</p>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "../components/ProfilePicture.vue"
export default {
  name: "UserResult",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProfilePicture,
  },

  methods: {
    goToProfile() {
      this.$router.push({
        name: "Profile",
        params: {
          username: this.user.username,
        },
      })
    },
  },
}
</script>

<style scoped>
.container {
  list-style: none;
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  padding: 1em;
  cursor: pointer;
  border-radius: 7px;
}

.container:hover {
  background-color: #8f8f8f8a;
}

.profile__picture {
  flex-shrink: 0;
}

.profile__info {
  margin-left: 1em;
}

.profile__name {
  text-align: left;
  font-size: 1.7rem;
  font-weight: 400;
  color: var(--on-secondary-color);
}

.profile__headline {
  margin-top: 2px;
  text-align: left;
  font-size: 1.3rem;
  color: var(--on-secondary-color-light);
}
</style>
