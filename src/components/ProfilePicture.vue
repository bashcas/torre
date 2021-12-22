<template>
  <div class="hexagon" :style="`background-image: url(${img})`"></div>
</template>

<script>
export default {
  name: "ProfilePicture",

  props: {
    img: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
div.hexagon {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  background-position: center;
  background-size: contain;
}
</style>
