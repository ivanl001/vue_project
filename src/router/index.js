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
      },
      {
        path: "/other",
        children: [
          {
            path: "/child01",
            component: () => import("../views/other/Child01")
          },{
            path: "/child01",
            component: () => import("../views/other/Child02")
          },{
            path: "/child01",
            component: () => import("../views/other/Child03")
          }
        ]
      }
    ]
  },
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
