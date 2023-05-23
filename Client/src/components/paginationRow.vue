<template>

    <div v-if="page > 1">
        <a :href="`/${prefix}?page=${--page}`" class="btn btn-outline-primary mx-2">
            السابق
        </a>
    </div>
    <a v-if="page < lastPage" :href="`/${prefix}?page=${++page}`" class="btn btn-outline-primary">
        التالي
    </a>

</template>

<script>
export default {
    name: "paginationRow",
    props: ["lastPage","page","prefix"],
};
</script>

<style scoped>
* {
  direction: ltr;
}
</style>
