<template>
  <div class="dialogcontent">
    <el-dialog
      title="新增车辆品牌"
      :visible.sync="dialogFlag"
      center
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="车辆品牌">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌型号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="LOGO">
          <div class="logoContent">
            <div class="uploadImg"></div>
            <div class="imgList">111</div>
          </div>
        </el-form-item>
        <el-form-item label="禁启用">
          <el-radio-group v-model="form.resource">
            <el-radio label="禁用"></el-radio>
            <el-radio label="启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="描述">
            <div class="address-map"></div>
          </el-form-item> -->
        <el-form-item label="经纬度">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addCarsBrand2",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      dialogFlag: false,
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
    //   alert(111);
      this.$emit("update:dialogFormVisible", false);
    },
  },
  watch: {
    dialogFormVisible: {
      handler(newValue, oldValue) {
        this.dialogFlag = newValue;
        console.log(newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>