<template>
  <div class="profile">
    <div class="profile__header">
      <ProfilePicture :img="user.person.picture" />
      <div class="profile__info">
        <h2 class="profile__name">{{ user.person.name }}</h2>
        <p class="profile__bio">{{ user.person.summaryOfBio }}</p>
      </div>
    </div>
    <h3>Skills and interests</h3>

    <div>
      <span class="material-icons">directions_bike</span>
      <h4>Master / Influencer</h4>
    </div>

    <ul>
      <li v-for="skill in expertStrengths" :key="skill.id">
        <Skill :skill="skill.name" />
      </li>
    </ul>

    <div>
      <span class="material-icons">directions_run</span>
      <h4>Proficient</h4>
    </div>
    <ul>
      <li v-for="skill in proficientStrengths" :key="skill.id">
        <Skill :skill="skill.name" />
      </li>
    </ul>
    <div>
      <span class="material-icons">directions_walk</span>
      <h4>Novice</h4>
    </div>
    <ul>
      <li v-for="skill in noviceStrengths" :key="skill.id">
        <Skill :skill="skill.name" />
      </li>
    </ul>

    <div>
      <span class="material-icons">nordic_walking</span>
      <h4>No experience, but interested</h4>
    </div>

    <ul>
      <li v-for="skill in noExperienceButInterestedStrengths" :key="skill.id">
        <Skill :skill="skill.name" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>

<script>
import axios from "axios"
import Skill from "../components/Skill.vue"
import ProfilePicture from "../components/ProfilePicture.vue"

const cors_proxy = "https://torre-proxy.vercel.app"

export default {
  name: "Profile",
  data() {
    return {
      url: `${cors_proxy}/?url=https://bio.torre.co/api/bios/scastanedag`,
      user: {
        person: {
          name: "",
          picture: "",
          summaryOfBio: "",
        },
        strengths: [],
      },
    }
  },

  components: {
    Skill,
    ProfilePicture,
  },

  created() {
    this.getUser()
  },

  methods: {
    async getUser() {
      const response = await axios.get(this.url, {})
      this.user = response.data
      // this.user = response.data.person.name
    },
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
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 12px;
}
</style>
