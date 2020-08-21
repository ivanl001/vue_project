import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layout/Layout"),
    children: [
      {
        path: "/home",
        component: () => import("../views/home/Home")
      },
      {
        path: "/user",
        component: () => import("../views/user/User")
      },
      {
        path: "/video",
        component: () => import("../views/video/Video")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
