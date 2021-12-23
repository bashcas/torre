<template>
  <div
    v-if="img"
    class="hexagon"
    :style="`background-image: url(${img}); width: ${size}px; height: ${size}px`"
  ></div>
  <div
    v-else
    class="hexagon"
    :style="`width: ${size}px; height: ${size}px`"
  ></div>
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
div.hexagon {
  width: 300px;
  height: 300px;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  background-image: url("../assets/images/default_user.jpg");
  background-position: center;
  background-size: contain;
}
</style>
