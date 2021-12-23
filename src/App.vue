<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Container from "./components/Container.vue"
import Profile from "./screens/Profile.vue"
</script>

<template>
  <Container maxWidth="1440">
    <router-view></router-view>
  </Container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  --primary-color: #cddc39;
  --primary-color-light: #d6e457;
  --on-primary: #000000de;
  --secondary-color: #383b40;
  --secondary-color-light: #ffffff8a;
  --on-secondary: hsla(0, 0%, 100%, 0.9);
  --on-secondary-light: #ffffff99;
  --bg-color: #27292d;
}

body {
  background-color: var(--bg-color);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 1.6rem;
  font-family: "Inter", sans-serif;
  color: var(--on-secondary);
}
li {
  list-style: none;
}
</style>
