<template>
  <div class="spinner" :style="`width: ${size}px; height: ${size}px`">
    <div :style="`width: ${0.8 * size}px; height: ${0.8 * size}px`"></div>
    <div :style="`width: ${0.8 * size}px; height: ${0.8 * size}px`">></div>
    <div :style="`width: ${0.8 * size}px; height: ${0.8 * size}px`">></div>
    <div :style="`width: ${0.8 * size}px; height: ${0.8 * size}px`">></div>
  </div>
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
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.spinner div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--primary-color) transparent transparent transparent;
}
.spinner div:nth-child(1) {
  animation-delay: -0.45s;
}
.spinner div:nth-child(2) {
  animation-delay: -0.3s;
}
.spinner div:nth-child(3) {
  animation-delay: -0.15s;
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
