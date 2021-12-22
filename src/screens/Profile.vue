<template>
  <div class="profile">
    <div class="profile__header">
      <ProfilePicture :img="user.person.picture" />
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
            <Skill :skill="skill.name" />
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
            <Skill :skill="skill.name" />
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
            <Skill :skill="skill.name" />
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
            <Skill :skill="skill.name" />
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
.profile__name {
  font-size: 3.2rem;
  font-weight: bold;
  margin-top: 16px;
}

.profile__bio {
  margin-top: 16px;
}

.profile__skills-title {
  margin-top: 16px;
  font-size: 2.4rem;
}

.profile__skills {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
