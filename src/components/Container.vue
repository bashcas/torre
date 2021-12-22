<template>
  <div :style="`max-width: ${maxWidth}px`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Container",
  props: {
    maxWidth: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
div {
  margin: 0 auto;
}
</style>
