<template>
  <div>
    <h4>{{ experience.name }}</h4>
    <h5>{{ experience.organizations[0].name }}</h5>
    <h6>
      {{ experience.fromMonth }} {{ experience.fromYear }}
      {{
        experience.toMonth
          ? "- " + experience.toMonth + " " + experience.toYear
          : ""
      }}
    </h6>
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

<style>
h4 {
  color: var(--primary-color);
  font-size: 1.6rem;
  text-align: left;
  font-weight: 400;
}
h5 {
  color: var(--on-secondary-light);
  font-size: 1.4rem;
  font-weight: 400;
  text-align: left;
}
h6 {
  color: var(--on-secondary-light);
  font-size: 1.2rem;
  font-weight: 400;
  text-align: left;
}
</style>
