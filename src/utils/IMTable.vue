<template>
  <div class="im-table">
    <el-table
      :data="tableData"
      border
      stripe
      show-overflow-tooltip
      style="width: 100%"
      height="94%"
      v-loading="tableConfig.loading"
    >
      <el-table-column
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableLabel"
        :key="index"
        :width="item.width ? item.width : 125"
      >
      </el-table-column>

      <el-table-column label="操作">
        <!--<template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>-->

        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="tableConfig.total"
      :current-page.sync="tableConfig.page"
      class="pagination"
      @current-change="pageChanged"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "IMTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    tableConfig: Object
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(row);
      this.$emit("handleEdit", row);
    },
    handleDelete(index, row) {
      console.log(row);
      this.$emit("handleDelete", row);
    },
    pageChanged(page) {
      this.$emit("pageChanged", page);
    }
  }
};
</script>

<style lang="scss" scoped>
.im-table {
  //background-color: #33aef0;
  height: calc(100% - 60px);
}

.pagination {
  //background-color: green;
}
</style>
