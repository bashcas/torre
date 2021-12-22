<template>
  <div class="profile">
    <div class="profile__header">
      <div class="profile__avatar">
        <img :src="user.person.picture" alt="profile picture" />
      </div>
      <div class="profile__info">
        <h2 class="profile__name">{{ user.person.name }}</h2>
        <p class="profile__bio">{{ user.person.summaryOfBio }}</p>
      </div>
    </div>
    <h3>Skills and interests</h3>
    <h4>Master / Influencer</h4>
    <ul>
      <li v-for="skill in expertStrengths" :key="skill.id">
        {{ skill.name }}
      </li>
    </ul>
    <h4>Proficient</h4>
    <ul>
      <li v-for="skill in proficientStrengths" :key="skill.id">
        {{ skill.name }}
      </li>
    </ul>
    <h4>Novice</h4>
    <ul>
      <li v-for="skill in noviceStrengths" :key="skill.id">
        {{ skill.name }}
      </li>
    </ul>
    <h4>No experience, but interested</h4>
    <ul>
      <li v-for="skill in noExperienceButInterestedStrengths" :key="skill.id">
        {{ skill.name }}
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

const cors_proxy = "https://cors-anywhere.herokuapp.com"

export default {
  name: "Profile",
  data() {
    return {
      url: `${cors_proxy}/https://bio.torre.co/api/bios/scastanedag`,
      user: {},
    }
  },

  created() {
    this.getUser()
  },

  methods: {
    async getUser() {
      const response = await axios.get(this.url, {})
      this.user = response.data
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
