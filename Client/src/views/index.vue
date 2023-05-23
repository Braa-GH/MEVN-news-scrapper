<template>
  <nav-bar class="mt-5"></nav-bar>
  <div class="container p-3">
    <div class="d-flex justify-content-between">
      <h2>أحدث الأخبار</h2>
      <div class="d-flex flex-row gap-2">
        <input
          v-model="searchKey"
          class="form-control me-2"
          type="search"
          aria-label="Search"
        />
        <button
          @click="searchToggle"
          class="btn btn-outline-success"
          type="button"
        >
          بحث
        </button>
      </div>
    </div>
      <div v-if="content" class="row pt-3">
          <div
                  v-for="blog in content"
                  class="col-12 col-md-4 col-lg-3"
          >
              <news-card v-bind:title="blog.title" :imgSrc="blog.image" :articleId="blog.article"></news-card>
          </div>
      </div>
      <div v-else class="row pt-3">
          <div v-for="blog in news" class="col-12 col-md-4 col-lg-3">
              <news-card v-bind:title="blog.title" :imgSrc="blog.image" :articleId="blog.article"></news-card>
          </div>
      </div>
    <div class="d-flex justify-content-center p-5">
      <pagination-row :prefix="'Home'" :last-page="lastPage" :page="page"></pagination-row>
    </div>
  </div>
</template>

<script>
import NewsCard from "@/components/NewsCard.vue";
import PaginationRow from "@/components/paginationRow.vue";
import NavBar from "@/components/gloabal/NavBar.vue";
import store from "@/store";
import router from "@/router";
import axios from "axios";
import sessionData from "vue-sessionstorage/src/mockStorage";

export default {
  name: "HomeView",
    data() {
        return {
            searchKey: "",
            content: "",
            news: [],
            lastPage: 1,
            page: this.$route.query.page,
        };
    },
    created() {
        // console.log(this.page)
        // console.log(store.state.token)
           axios({
               method: "get",
               url: `http://localhost:5000/news?page=${this.page}`,
               headers: {
                   Authorization: localStorage.getItem("token")
               }
           })
               .then((response) => {
                   this.news = response.data.news;
                   this.lastPage = response.data.lastPageNumber
               })
               .catch((e) => {
                   console.log("Error")
                   console.log(e)
                   if (e.config.headers.Authorization == null){
                       router.push('/Login')
                   }
               });
    },
  components: {
    NavBar,
    PaginationRow,
    NewsCard,
  },
  computed: {
    search() {
      const filter = new RegExp(this.searchKey, "i");
      return this.news.filter((el) => el.title.match(filter));
    },
  },
  methods: {
      searchToggle() {
        this.content = this.search;
      },
  },
  watch: {
    searchKey: function (v) {
      if (v.length === 0) {
        this.content = this.news;
      }
    },
  },

};
</script>

<style scoped>
  * {
      direction: rtl;
  }
</style>
