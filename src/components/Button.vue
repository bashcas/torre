<template>
  <button><slot></slot></button>
</template>

<script>
export default {
  name: "Button",
  props: {
    icon: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
button {
  background-color: transparent;
  outline: 1px solid var(--primary-color);
  color: var(--on-primary);
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  cursor: pointer;
  display: block;
  color: var(--primary-color);
}
button:hover {
  background-color: var(--secondary-color);
}

button:active {
  background-color: var(--primary-color-dark);
}
</style>
