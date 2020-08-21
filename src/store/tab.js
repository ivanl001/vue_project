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
