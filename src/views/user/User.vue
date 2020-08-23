<template>
  <div class="im-user">
    <el-dialog
      :title="userOpeType === 'add' ? '新增' : '编辑'"
      :visible.sync="isShow"
    >
      <i-m-form
        :form-label="userOpeLabel"
        :form-model="userOpeModel"
        ref="form-model"
      ></i-m-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <div class="im-user-header">
      <el-button type="primary">+ 新增</el-button>
      <i-m-form inline :form-label="formLabel" :form-model="searchForm">
        <el-button type="primary">查询</el-button>
      </i-m-form>
    </div>

    <i-m-table
      :table-data="tableData"
      :table-label="tableLabel"
      :table-config="tableConfig"
      @pageChanged="pageChanged"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    ></i-m-table>
  </div>
</template>

<script>
import IMForm from "../../utils/IMForm";
import IMTable from "../../utils/IMTable";

export default {
  name: "User",
  data() {
    return {
      isShow: false,
      userOpeType: "add",
      tableData: [],
      tableLabel: [
        { label: "序号", type: "index" },
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        { prop: "sexLabel", label: "性别" },
        { prop: "birth", label: "出生日期" },
        { prop: "addr", label: "地址", width: 300 },
        { label: "附加" }
      ],
      tableConfig: {
        page: 1,
        total: 30,
        loading: false
      },
      searchForm: {
        keyword: "",
        abc: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: "用户信息"
        }
      ],

      userOpeLabel: [
        {
          model: "name",
          label: "用户名"
        },
        {
          model: "addr",
          label: "地址"
        },
        {
          model: "age",
          label: "年龄"
        },
        {
          model: "birth",
          label: "生日",
          type: "date"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 0 }
          ]
        }
      ],
      userOpeModel: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: 0
      }
    };
  },
  methods: {
    getUserList() {
      this.tableConfig.loading = true;
      this.$http
        .get("/api/user/getUser", { params: { page: this.tableConfig.page } })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? "男" : "女";
            return item;
          });
          this.tableConfig.total = res.data.count;
          this.tableConfig.loading = false;
        });
    },
    pageChanged(page) {
      console.log("dddd:", page);
      this.getUserList();
    },
    handleEdit(row) {
      this.userOpeType = "edit";
      this.userOpeModel = row;
      this.isShow = true;
    },
    handleDelete(row) {
      console.log("user页面-删除---", row);

      //在这里弹出框让用户确认删除
      this.open(row);
    },

    open(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          this.$http.get("/user/del", { params: { id } }).then(res => {
            console.log(res.data);
            this.getUserList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    confirm() {
      if (this.userOpeType === "edit") {
        this.$http.post("/user/edit", this.userOpeModel).then(res => {
          console.log(res.data);
          this.isShow = false;
          this.getUserList();
        });
      }
    }
  },
  created() {
    this.getUserList();
  },
  components: {
    IMForm,
    IMTable
  }
};
</script>

<style lang="scss" scoped>
.im-user {
  //background-color: red;
  height: 100%;
  //padding-bottom: 20px;
  overflow: hidden;
  .im-user-header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    //background-color: rebeccapurple;
    align-items: flex-start;
    margin-bottom: 20px;
  }
}
</style>
