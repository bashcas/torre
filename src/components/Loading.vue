<template>
  <div class="spinner" :style="`width: ${size}px; height: ${size}px`"></div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    size: {
      type: Number,
      default: 50,
    },
  },
}
</script>

<style scoped>
.spinner {
  border: 5px solid var(--secondary-color);
  border-top: 5px solid var(--primary-color);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
