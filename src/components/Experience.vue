<template>
  <div>
    <h4>{{ experience.name }}</h4>
  </div>
</template>

<script>
export default {
  name: "Experience",
  props: {
    experience: {
      type: Object,
      required: true,
    },
  },
}
</script>
