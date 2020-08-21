<template>
  <div class="tabs">
    <el-tag
      size="small"
      :key="tag.path"
      v-for="tag in tabList"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeTag(tag)"
      :effect="$route.path === tag.path ? 'dark' : 'plain'"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "IMTab",
  data() {
    return {
      //dynamicTags: ["标签一", "标签二", "标签三", "ssss"],
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {
    ...mapState({
      tabList: state => state.tab.tabList
    })
  },
  methods: {
    handleClose(tag) {
      this.tabList.splice(this.tabList.indexOf(tag), 1);
    },
    changeTag(item) {
      this.$router.push({ path: item.path });
      this.$store.commit("selectMenu", item);
    },
    showInput() {
      this.inputVisible = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tabList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  /*background-color: ;*/
  .el-tag {
    margin-right: 10px;
  }
}
</style>
