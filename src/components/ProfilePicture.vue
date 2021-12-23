<template>
  <div
    v-if="img"
    :style="`background-image: url(${img}); width: ${size}px; height: ${size}px`"
  ></div>
  <div v-else :style="`width: ${size}px; height: ${size}px`"></div>
</template>

<script>
export default {
  name: "ProfilePicture",

  props: {
    img: {
      type: String,
    },
    size: {
      type: Number,
      default: 300,
    },
  },
}
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
  background-image: url("../assets/images/default_user.jpg");
  border-radius: 50%;
  border: 3px solid var(--secondary-color-light);
  outline: 1px solid var(--secondary-color-light);
  background-position: center;
  background-size: contain;
}
</style>
