<template>
  <div @click="goToDetail">
    <span>{{ skill }}</span>
  </div>
</template>

<script>
export default {
  name: "Skill",
  props: {
    skill: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },

  methods: {
    goToDetail() {
      this.$router.push({
        name: "SkillDetail",
        params: {
          username: this.username,
          id: this.id,
        },
      })
    },
  },
}
</script>

<style scoped>
div {
  display: inline-block;
  padding: 10px;
  font-size: 1.4rem;
  border-radius: 5px;
  background-color: var(--secondary-color);
  color: var(--on-secondary);
  cursor: pointer;
}
div:hover {
  background-color: var(--secondary-color-light);
}
</style>
