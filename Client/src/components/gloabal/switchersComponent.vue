<template>
  <div class="d-flex gap-2">
    <router-link to="/Home?page=1" class="btn btn-primary">الكل</router-link>
    <router-link to="/SportNews?page=1" class="btn btn-primary">رياضي</router-link>
    <router-link to="/PoliticalNews?page=1" class="btn btn-primary">سياسي</router-link>
    <router-link to="/EconomicNews?page=1" class="btn btn-primary">اقتصادي</router-link>
    <router-link to="/Logout" class="btn btn-danger">تسجيل الخروج</router-link>
  </div>
</template>

<script>
export default {
  name: "switchersComponent",
};
</script>

<style scoped></style>
