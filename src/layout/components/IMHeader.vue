<template>
  <header>
    <div class="left-content">
      <el-button
        type="primary"
        icon="el-icon-menu"
        size="mini"
        @click="menuBtnClick"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: current.path }" v-if="current">{{
          current.name
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImage" style="width:44px;height:44px" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click.native="logout"
            >退出登陆</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "IMHeader",
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userImage: require("../../assets/images/user-default.png")
    };
  },
  methods: {
    menuBtnClick() {
      // console.log("ddd")
      this.$store.commit("collapsOrOpeneMenu");
    },
    logout() {
      console.log("退出登陆！！！");
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      location.reload();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.left-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 10px;
  }
}
</style>
