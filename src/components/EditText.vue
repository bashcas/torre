<template>
  <input type="text" v-model="text" :placeholder="placeholder" />
</template>

<script>
export default {
  name: "EditText",
  props: {
    text: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  watch: {
    text(newText) {
      this.$emit("text-changed", newText)
    },
  },
}
</script>
<style>
input {
  width: 100%;
  padding: 10px;
  font-size: 1.4rem;
  border-radius: 5px;
  background-color: var(--secondary-color);
  color: var(--on-secondary);
  cursor: pointer;
  border: 1px solid var(--secondary-color-light);
}

input:focus {
  border: 1px solid var(--primary-color);
  outline: 1px solid var(--primary-color);
}

input::placeholder {
  color: var(--on-secondary);
}
</style>
