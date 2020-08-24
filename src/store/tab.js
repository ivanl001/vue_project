import Cookie from "js-cookie";

export default {
  state: {
    menu: [],
    currentMenu: null,
    isCollapse: false,
    tabList: [
      {
        path: "/home",
        name: "home",
        icon: "el-icon-s-home"
      }
    ]
  },
  mutations: {
    //设置menu
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },

    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      let menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;

      //先定义好基础布局
      let currentMenu = [
        {
          path: "/",
          //redirect: "/home",
          component: () => import("@/layout/Layout.vue"),
          children: []
        }
      ];

      menu.forEach(item => {
        if (!item.children) {
          //无菜单
          console.log("无紫菜蛋");
          console.log(item);
          // item.component = () => import(`@/views/${item.url}`)

          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        } else {
          //这里是有子菜单的
          console.log("有紫菜蛋");
          console.log(item.children);
          item.children = item.children.map(item01 => {
            item01.compnent = () => import(`@/views/${item01.url}`);
            return item01;
          });
          currentMenu[0].children.push(...item.children);
        }
      });

      console.log("heihei", currentMenu);
      router.addRoutes(currentMenu);
    },

    //
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
      state.tabList = [
        {
          path: "/home",
          name: "home",
          icon: "el-icon-s-home"
        }
      ];
    },

    selectMenu(state, val) {
      if (val === null) {
        console.log("home");
      } else {
        state.currentMenu = val;
        console.log(val.path);
        let result = state.tabList.findIndex(item => item.path === val.path);
        result === -1 ? state.tabList.push(val) : "";
      }
    },
    closeTab(state, val) {
      let result = state.tabList.findIndex(item => item.path === val.path);
      state.tabList.splice(result, 1);
    },
    collapsOrOpeneMenu(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {}
};
