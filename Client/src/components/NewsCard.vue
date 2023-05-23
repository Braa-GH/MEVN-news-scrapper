
<template>
  <div class="card my-2">
    <img v-bind:src="imgSrc" class="card-img-top" alt="صورة الخبر" />
    <div class="card-body">
      <h3>{{ title }}</h3>
      <router-link :to="`/NewsPage/${articleId}`" class="btn btn-primary" > قراءة المزيد</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "imgSrc","articleId"],
  name: "NewsCard",
};
</script>

<style scoped></style>
