<template>
  <div class="im-user">
    <div class="im-user-header">
      <i-m-form></i-m-form>
    </div>
    <div class="im-user-content">
      <i-m-table></i-m-table>
    </div>
  </div>
</template>

<script>
  import IMForm from "../../utils/IMForm";
  import IMTable from "../../utils/IMTable";

export default {
  name: "User",
  components:{
    IMForm,
    IMTable
  }

};
</script>

<style lang="scss" scoped></style>
