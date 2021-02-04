<template>
  <div class="addContent">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="区域">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      
      <el-form-item label="类型">
        <el-radio-group v-model="form.resource">
          <el-radio label="室内"></el-radio>
          <el-radio label="室外"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="禁启用">
        <el-radio-group v-model="form.resource">
          <el-radio label="禁用"></el-radio>
          <el-radio label="启用"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="address-map">

        </div>
      </el-form-item>
      <el-form-item label="经纬度">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
};
</script>

<style lang="scss" scoped>
.address-map {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>