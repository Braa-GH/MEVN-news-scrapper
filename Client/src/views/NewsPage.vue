<template>
  <div class="">
    <nav-bar class="mt-5"></nav-bar>
    <news-report class="pt-5"></news-report>
  </div>
</template>

<script>
import NewsReport from "@/components/gloabal/NewsReport.vue";
import NavBar from "@/components/gloabal/NavBar.vue";

export default {
  name: "NewsPage",
  components: { NavBar, NewsReport },
};
</script>

<style scoped></style>
