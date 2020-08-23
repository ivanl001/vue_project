<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <template v-for="(item, menu_k) in theMenu">
      <el-menu-item
        :index="item.path"
        :key="menu_k"
        @click="clickMenu(item)"
        v-if="!item.children"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>

      <el-submenu :index="item.path" v-if="item.children" :key="menu_k">
        <template slot="title">
          <i :class="item.icon"></i>
          <span> {{ item.name }} </span>
        </template>
        <el-menu-item
          :index="subItem.path"
          @click="clickMenu(subItem)"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
        >
          <i :class="subItem.icon"></i>
          <span slot="title">{{ subItem.name }}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "IMAside",
  data() {
    return {
      theMenu: [
        {
          path: "/home",
          name: "home",
          icon: "el-icon-s-home"
        },
        {
          path: "/video",
          name: "video",
          icon: "el-icon-phone"
        },
        {
          path: "/user",
          name: "user",
          icon: "el-icon-user"
        },
        {
          name: "other",
          icon: "el-icon-s-promotion",
          path: "/other",
          children: [
            {
              path: "/child01",
              name: "child01",
              icon: "el-icon-s-release"
            },
            {
              path: "/child02",
              name: "child02",
              icon: "el-icon-s-ticket"
            },
            {
              path: "/child03",
              name: "child03",
              icon: "el-icon-s-comment"
            }
          ]
        }
      ]

      /*     theMenu: []*/
    };
  },
  methods: {
    clickMenu(item) {
      console.log("name:" + item.name);
      this.$router.push({ path: item.path });

      if (item.name != "home") {
        this.$store.commit("selectMenu", item);
      } else {
        this.$store.commit("selectMenu", null);
      }
      //this.$router.push({ name: item.name });
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    menu() {
      return this.$store.state.tab.menu;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border-right-width: 0px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
