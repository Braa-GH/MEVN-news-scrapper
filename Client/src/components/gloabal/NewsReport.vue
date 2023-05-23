<template>
  <div class="container py-0 card-body">
    <h1>{{ article.title }}</h1>
      <h4>{{ article.date }}</h4>
    <img
      v-bind:src="article.img"
      width="600"
      alt="صورة تعبيرية"
    />
    <div class="fs-5 pt-3">
      <p v-for="blog in article.content">
          {{ blog }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import router from "@/router";

export default {
    name: "NewsReport",
    data (){
      return {
          article: []
      }
    },
    created() {
        const id = this.$route.params.id;
        axios.get(`http://localhost:5000/news/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {
                this.article = response.data;
        }).catch( e => {
            console.log(e.message)
            router.push('/Login')
        })
    }

}
</script>

<style scoped></style>
