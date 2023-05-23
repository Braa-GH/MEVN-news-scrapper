<template>
  <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../../assets/logo.png"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        <span class="fw-bold">الإخبارية</span>
      </a>
      <switchers-component></switchers-component>
    </div>
  </nav>
</template>

<script>
import SwitchersComponent from "@/components/gloabal/switchersComponent.vue";
export default {
  name: "NavBar",
  components: {
    SwitchersComponent,
  },
};
</script>

<style scoped>
nav {
  background-color: #eee;
}
</style>
