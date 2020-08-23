<template>
  <el-form
    :inline="inline"
    :model="formModel"
    ref="formModel"
    label-width="100px"
  >
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label + ' :'"
    >
      <el-input
        v-model="formModel[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="!item.type"
      ></el-input>

      <el-select
        v-model="formModel[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'select'"
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in item.options"
          :key="item.value"
        ></el-option>
      </el-select>

      <el-switch
        v-model="formModel[item.model]"
        v-if="item.type === 'switch'"
      ></el-switch>

      <el-date-picker
        v-model="formModel[item.model]"
        v-if="item.type === 'date'"
        :placeholder="'请输入' + item.label"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "IMForm",
  props: {
    inline: Boolean,
    formModel: Object,
    formLabel: Array
  }
};
</script>

<style lang="scss" scoped></style>
