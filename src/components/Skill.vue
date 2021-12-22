<template>
  <div>
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
