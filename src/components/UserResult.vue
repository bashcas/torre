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
  background-color: var(--secondary-color-light);
  color: var(--on-primary);
}

.profile__picture {
  flex-shrink: 0;
}

.profile__info {
  margin-left: 1em;
}

.profile__name {
  text-align: left;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--primary-color);
}

.container:hover > .profile__info > .profile__name {
  color: var(--primary-color-dark);
}

.profile__headline {
  text-align: left;
  font-size: 1.2rem;
}
</style>
