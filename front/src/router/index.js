import Vue from "vue";
import VueRouter from "vue-router";
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    // redirect to main page, si no estas logueado pues mandarlo al login
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
