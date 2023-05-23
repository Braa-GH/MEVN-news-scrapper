import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/index.vue";
import SportNews from "../views/SportNews.vue";
import PoliticalNews from "../views/PoliticalNews.vue";
import EconomicNews from "../views/EconomicNews.vue";
import NewsPage from "../views/NewsPage.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import LogOut from "@/components/LogOut.vue";
const routes = [
  {
    path: "/",
    name: "index",
    component: HomeView,
  },
  {
    path: "/Home",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/SportNews",
    name: "SportNews",
    component: SportNews,
  },
  {
    path: "/PoliticalNews",
    name: "PoliticalNews",
    component: PoliticalNews,
  },
  {
    path: "/EconomicNews",
    name: "EconomicNews",
    component: EconomicNews,
  },
  {
    path: "/NewsPage/:id",
    name: "NewsPage",
    component: NewsPage,
  },
  {
    path: "/SignUp",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/LogIn",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/logout",
    name: "LogOut",
    component: LogOut,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

  // router.beforeEach(async (to, from, next) => {
  //   if (store.state.token != null){
  //     next(to.name);
  //   }else {
  //     next('/login');
  //   }
  // });

export default router;
