<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <i-m-aside></i-m-aside>
    </el-aside>
    <el-container>
      <el-header>
        <i-m-header></i-m-header>
      </el-header>
      <i-m-tab></i-m-tab>
      <el-main>
        <i-m-main></i-m-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import IMAside from "./components/IMAside";
import IMHeader from "./components/IMHeader";
import IMMain from "./components/IMMain";
import IMTab from "./components/IMTab";

export default {
  name: "Layout",
  components: {
    IMAside,
    IMHeader,
    IMMain,
    IMTab
  }
};
</script>

<style scoped>
.el-header {
  background-color: gray;
}
/*.el-main {
  background-color: #999;
}*/
</style>
