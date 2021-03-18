<template>
  <div class="dialogcontent">
    <el-dialog
      title="新增车辆品牌"
      :visible.sync="dialogFlag"
      center
      @close="close"
      @open="open"
    >
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="品牌中文">
          <el-input v-model="form.nameCh"></el-input>
        </el-form-item>
        <el-form-item label="品牌英文">
          <el-input v-model="form.nameEn"></el-input>
        </el-form-item>
        <el-form-item label="LOGO">
          <div class="logoContent">
            <div class="uploadImg"></div>
            <div class="imgList">111</div>
          </div>
        </el-form-item>
        <el-form-item label="禁启用">
          <el-radio-group v-model="form.type">
            <el-radio label="禁用"></el-radio>
            <el-radio label="启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="描述">
            <div class="address-map"></div>
          </el-form-item> -->
        <el-form-item label="经纬度">
          <el-input v-model="form.lnglat"></el-input>
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
import { BrandLogo } from "../../api/brand";
export default {
  name: "addCarsBrand2",
  data() {
    return {
      form: {
        lnglat: "",
        nameCh: "",
        nameEn: "",
        type: "",
      },
      dialogFlag: false,
      logo: "",
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
    open() {
      this.getBrandLogo()
    },
    getBrandLogo() {
      BrandLogo().then((res)=> {
        const data = res.data;
        if(data) {
          this.logo = data;
        };
        console.log(this.logo)
      })
    }
  },
  watch: {
    dialogFormVisible: {
      handler(newValue, oldValue) {
        this.dialogFlag = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>