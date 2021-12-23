<template>
  <div v-if="loading" class="loading-container">
    <Loading :size="250" />
  </div>
  <div class="profile" v-else>
    <Button @click="this.$router.back()">
      <span class="material-icons">arrow_back</span>
    </Button>
    <div class="profile__header">
      <ProfilePicture :img="user.person.picture" class="profile__picture" />
      <div class="profile__info">
        <h2 class="profile__name">{{ user.person.name }}</h2>
        <p class="profile__bio">{{ user.person.summaryOfBio }}</p>
      </div>
    </div>
    <h3 class="profile__skills-title">Skills and interests</h3>

    <div class="profile__skills">
      <div class="profile__skills-container">
        <div class="profile__skills-category">
          <span class="material-icons">directions_bike</span>
          <h4 class="profile__skills-category-title">Master / Influencer</h4>
        </div>
        <ul>
          <li v-for="skill in expertStrengths" :key="skill.id">
            <Skill
              :skill="skill.name"
              :username="user.person.username"
              :id="skill.id"
            />
          </li>
        </ul>
      </div>

      <div class="profile__skills-container">
        <div class="profile__skills-category">
          <span class="material-icons">directions_run</span>
          <h4 class="profile__skills-category-title">Proficient</h4>
        </div>
        <ul>
          <li v-for="skill in proficientStrengths" :key="skill.id">
            <Skill
              :skill="skill.name"
              :username="user.person.username"
              :id="skill.id"
            />
          </li>
        </ul>
      </div>

      <div class="profile__skills-container">
        <div class="profile__skills-category">
          <span class="material-icons">directions_walk</span>
          <h4 class="profile__skills-category-title">Novice</h4>
        </div>
        <ul>
          <li v-for="skill in noviceStrengths" :key="skill.id">
            <Skill
              :skill="skill.name"
              :username="user.person.username"
              :id="skill.id"
            />
          </li>
        </ul>
      </div>

      <div class="profile__skills-container">
        <div class="profile__skills-category">
          <span class="material-icons">nordic_walking</span>
          <h4 class="profile__skills-category-title">
            No experience, but interested
          </h4>
        </div>
        <ul>
          <li
            v-for="skill in noExperienceButInterestedStrengths"
            :key="skill.id"
          >
            <Skill
              :skill="skill.name"
              :username="user.person.username"
              :id="skill.id"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>

<script>
import { useRoute } from "vue-router"
import Skill from "../components/Skill.vue"
import ProfilePicture from "../components/ProfilePicture.vue"
import Button from "../components/Button.vue"
import { getUserByUsername } from "../api"
import Loading from "../components/Loading.vue"

export default {
  name: "Profile",
  data() {
    return {
      user: {
        person: {
          name: "",
          username: "",
          picture: "",
          summaryOfBio: "",
        },
        strengths: [],
      },
      loading: false,
    }
  },

  components: {
    Skill,
    ProfilePicture,
    Button,
    Loading,
  },

  created() {
    const route = useRoute()
    this.loading = true
    getUserByUsername(route.params.username)
      .then((user) => {
        this.user = user
        this.user.person.username = route.params.username
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },

  computed: {
    expertStrengths() {
      return this.user.strengths.filter(
        (strength) => strength.proficiency === "expert"
      )
    },
    proficientStrengths() {
      return this.user.strengths.filter(
        (strength) => strength.proficiency === "proficient"
      )
    },
    noviceStrengths() {
      return this.user.strengths.filter(
        (strength) => strength.proficiency === "novice"
      )
    },
    noExperienceButInterestedStrengths() {
      return this.user.strengths.filter(
        (strength) => strength.proficiency === "no-experience-interested"
      )
    },
  },
}
</script>

<style scoped>
.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 12px;
}

.profile__header {
  margin-top: 32px;
}
.profile__picture {
  margin: 0 auto;
}

.profile__name {
  font-size: 3.2rem;
  font-weight: bold;
  margin-top: 16px;
}

.profile__bio {
  margin-top: 16px;
}

.profile__skills-title {
  margin-top: 32px;
  font-size: 2.4rem;
}

.profile__skills {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
}

.profile__skills-category {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.profile__skills-category-title {
  display: inline;
}
</style>
