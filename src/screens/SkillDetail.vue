<template>
  <div v-if="loading" class="loading-container">
    <Loading :size="250" />
  </div>
  <div v-else>
    <div class="header">
      <Button @click="this.$router.back()"
        ><span class="material-icons">close</span></Button
      >
      <h2>{{ skill.name }}</h2>
    </div>
    <section class="proficiency">
      <div class="stat">
        <h3>Proficiency:</h3>
        <div
          v-if="skill.stats.proficiency === 'expert'"
          class="proficiency__stat-container"
        >
          <span class="material-icons">directions_bike</span>
          <span>Expert</span>
        </div>
        <div
          v-else-if="skill.stats.proficiency === 'proficient'"
          class="proficiency__stat-container"
        >
          <span class="material-icons">directions_run</span>
          <span>Proficient</span>
        </div>
        <div
          v-else-if="skill.stats.proficiency === 'novice'"
          class="proficiency__stat-container"
        >
          <span class="material-icons">directions_walk</span>
          <span>Novice</span>
        </div>
        <div v-else class="proficiency__stat-container">
          <span class="material-icons">nordic_walking</span>
          <span>No experience, but interested</span>
        </div>
      </div>
      <div class="recommendations">
        <div class="stat">
          <h3>Recommendations:</h3>
          <span>{{ skill.stats.recommendations }}</span>
        </div>
      </div>
      <div class="daysOfExperience">
        <div class="stat">
          <h3>Days of experience:</h3>
          <span>{{ skill.stats.daysOfExperience }}</span>
        </div>
      </div>
    </section>
    <hr class="division" />
    <section
      class="related-experiences"
      v-if="skill.relatedExperiences.length > 0"
    >
      <h3>{{ user.person.name }}'s related experiences:</h3>
      <ul class="experience-list">
        <li v-for="experience in skill.relatedExperiences" :key="experience.id">
          <Experience :experience="experience" />
        </li>
      </ul>
    </section>
    <hr class="division" />
    <section class="otherPeople">
      <h3>Other people who have this skill:</h3>
      <ul class="user-list">
        <li v-for="person in otherPeople" :key="person.id">
          <UserResult :user="person" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { getSkillDetail, getUserByUsername, searchPeople } from "../api"
import { useRoute } from "vue-router"
import Button from "../components/Button.vue"
import Loading from "../components/Loading.vue"
import Experience from "../components/Experience.vue"
import UserResult from "../components/UserResult.vue"

export default {
  name: "SkillDetail",

  data() {
    return {
      skill: {
        name: "",
        id: "",
        relatedExperiences: [],
        stats: {
          proficiency: "",
          recommendations: { type: Number, default: 0 },
          daysOfExperience: { type: Number, default: 0 },
        },
      },
      username: "",
      user: {
        person: {
          name: "",
        },
        languages: [],
      },
      otherPeople: [],
      loading: false,
    }
  },

  components: {
    Button,
    Loading,
    Experience,
    UserResult,
  },

  created() {
    this.getData()
  },

  methods: {
    async getSkillDetail() {
      const route = useRoute()
      const { username, id } = route.params
      this.username = username
      const data = await getSkillDetail(username, id)
      this.skill = data
      console.log(data.relatedExperiences)
    },
    async getUser() {
      const user = await getUserByUsername(this.username)
      this.user = user
    },

    async getOtherPeopleWithSameSkill() {
      const otherPeople = await searchPeople(
        {
          and: [
            {
              "skill/role": {
                text: this.skill.name,
                proficiency: this.skill.stats.proficiency,
              },
              language: {
                term: this.user.languages[0]
                  ? this.user.languages[0].language
                  : "English",
                fluency: this.user.languages[0]
                  ? this.user.languages[0].fluency
                  : "conversational",
              },
            },
          ],
        },
        null
      )
      this.otherPeople = otherPeople.results.slice(0, 3)
    },

    async getData() {
      this.loading = true
      await this.getSkillDetail()
      await this.getUser()
      await this.getOtherPeopleWithSameSkill()
      this.loading = false
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
.header {
  display: flex;
  align-items: center;
  gap: 20px;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-weight: 400;
  font-size: 1.6rem;
  color: var(--on-secondary-light);
}

.proficiency {
  margin-top: 50px;
  text-align: left;
}

.stat {
  display: flex;
  align-items: center;
  gap: 20px;
}

.proficiency__stat-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.recommendations {
  margin-top: 25px;
}

.daysOfExperience {
  margin-top: 25px;
}

.division {
  margin-top: 50px;
  margin-bottom: 50px;
}

.experience-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
