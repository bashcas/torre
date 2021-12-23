<template>
  <div>error</div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
