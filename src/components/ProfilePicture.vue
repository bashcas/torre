<template>
  <div class="hexagon">
    <img :src="img" />
  </div>
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
  width: fit-content;
  margin: 0 auto;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
}
</style>
