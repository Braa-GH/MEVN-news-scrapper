<template>
  <nav-bar class="mt-5"></nav-bar>
  <div class="container p-3">
    <div class="d-flex justify-content-between">
      <h2>أخبار اقتصادية</h2>
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
        <pagination-row :prefix="'EconomicNews'" :last-page="lastPage" :page="page"></pagination-row>
    </div>
  </div>
</template>

<script>
import NewsCard from "@/components/NewsCard.vue";
import PaginationRow from "@/components/paginationRow.vue";
import NavBar from "@/components/gloabal/NavBar.vue";
import axios from "axios";
import store from "@/store";
import router from "@/router";
export default {
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
        axios({
            method: "get",
            url: "http://localhost:5000/news/economic",
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
  name: "EconomicNews",
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

<style scoped></style>
