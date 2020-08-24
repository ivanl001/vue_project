import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  /*{
    path: "/",
    redirect: "/home",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/Home.vue")
      },
      {
        path: "/user",
        component: () => import("@/views/user/User.vue")
      },
      {
        path: "/video",
        component: () => import("@/views/video/Video.vue")
      },
      {
        path: "/child01",
        component: () => import("@/views/other/Child01.vue")
      },
      {
        path: "/child02",
        component: () => import("@/views/other/Child02.vue")
      },
      {
        path: "/child03",
        component: () => import("@/views/other/Child03.vue")
      }
    ]
  },*/
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login")
  }
];

const router = new VueRouter({
  routes
});

export default router;
