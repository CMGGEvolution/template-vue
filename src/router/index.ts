import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/modules/users/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/modules/users/views/AboutView.vue"),
    },
  ],
});

export default router;
