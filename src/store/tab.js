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
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    /*addMene(state, router){
      let menu = Cookie.get('menu');
      if (!menu) {
        return
      }
      state.menu = menu;
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/layout/Layout`),
          children:[]
        }
      ];
      menu.forEach(item => {

        if (!item.child) {
          //无菜单
          console.log("无紫菜蛋");
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        } else {
          //这里是有子菜单的
          console.log("有紫菜蛋");
          item.child
        }
      })
    },*/

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
