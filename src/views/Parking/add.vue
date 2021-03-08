<template>
  <div class="addContent">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="停车场名称" prop="parkingName">
        <el-input
          v-model="form.parkingName"
          placeholder="请输入停车场名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <el-cascader
          :placeholder="initValue"
          v-model="form.area"
          :options="options"
          :props="props"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio
            v-for="item in type"
            :key="item.index"
            :label="item.label"
            >{{ item.value }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可停放车辆" prop="carsNumber">
        <el-input v-model.number="form.carsNumber"></el-input>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio
            v-for="item in status"
            :key="item.index"
            :label="item.label"
            >{{ item.value }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="address-map">
          <AMap ref="amap" @lonlag="lonlag" />
        </div>
      </el-form-item>
      <el-form-item label="经纬度" prop="lnglat">
        <el-input v-model="form.lnglat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          :loading="button_loading"
          @click="submitForm('form')"
          >立即创建</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AMap from "../amap/index.vue";
// 接口
import { GetCity } from "../../api/common";
import { ParkingAdd, ParkingDetailed, ParkingEdit } from "../../api/parking";

export default {
  name: "add",
  data() {
    const _this = this;
    return {
      id: this.$route.query.id,
      type: this.$store.state.config.parking_type,
      status: this.$store.state.config.parking_status,
      initValue: "请选择区域", //控制区域的默认值
      address: [],
      addressMore: {},
      // 控制按钮加载与否
      button_loading: false,
      form: {
        parkingName: "",
        area: "",
        address: "",
        type: "",
        carsNumber: "",
        status: "",
        lnglat: "",
      },
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const level = node.level;
          // 定义请求JSON对象
          const requestData = {};
          // 声明自定义配置
          // 省份
          if (level == 0) {
            // 给空JSON对象添加一组键值对
            requestData.type = "province";
          }
          // 城市
          if (level == 1) {
            requestData.type = "city";
            requestData.province_code = node.value;
          }
          // 区
          if (level == 2) {
            requestData.type = "area";
            requestData.city_code = node.value;
          }
          GetCity(requestData).then((res) => {
            const data = res.data.data;
            if (level == 0) {
              data.forEach((item) => {
                item.value = item.PROVINCE_CODE;
                item.label = item.PROVINCE_NAME;
              });
            }
            if (level == 1) {
              data.forEach((item) => {
                item.value = item.CITY_CODE;
                item.label = item.CITY_NAME;
              });
            }
            if (level == 2) {
              data.forEach((item) => {
                item.value = item.AREA_CODE;
                item.label = item.AREA_NAME;
                item.leaf = level >= 2;
              });
              console.log(data);
            }
            // 下面专门存储省市区的数据
            resolve(data);
            if (level != 0) {
              _this.getAddress(node);
            }
          });
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          // resolve(nodes);
        },
      },
      value: [],
      options: [],
      rules: {
        parkingName: [
          { required: true, message: "请输入停车场名称", trigger: "change" },
        ],
        carsNumber: [
          { required: true, message: "数目不能为空" },
          { type: "number", message: "必须为数字值" },
        ],
        area: [{ required: true, message: "请选择区域", trigger: "change" }],
        lnglat: [
          { required: true, message: "请输入经纬度", trigger: "change" },
        ],
      },
    };
  },
  components: { AMap },
  methods: {
    lonlag(e) {
      console.log(e);
    },
    getAddress(node) {
      const index = node.level - 1;
      // 给空数组赋值的操作，左边索引，右边索引对应的内容
      this.address[index] = node.label;
      this.$refs.amap.setCenter(this.address.join(""));
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.id ? this._ParkingEdit() : this._ParkingAdd();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    _ParkingAdd() {
      this.button_loading = true;
      ParkingAdd(this.form)
        .then((res) => {
          this.$message({
            message: "提交成功！",
            type: "success",
          });
          // 重置表单时传的参数要加“”号
          this.resetForm("form");
          this.button_loading = false;
        })
        .catch((error) => {
          this.button_loading = false;
        });
    },
    _ParkingEdit() {
      this.button_loading = true;
      const requestData = JSON.parse(JSON.stringify(this.form));
      requestData.id = this.id;
      ParkingEdit(requestData)
        .then((res) => {
          this.$message({
            message: "提交成功！",
            type: "success",
          });
          this.$router.push({
            name: "Parking",
          })
          this.button_loading = false;
        })
        .catch((error) => {
          this.button_loading = false;
        });
    },
    _ParkingDetailed() {
      if (!this.id) {
        return false;
      }
      const id = this.id;
      ParkingDetailed({ id: this.id }).then((res) => {
        const data = res.data;
        for (let key in data) {
          //include用于某个数组里面对某个值的判断
          if (Object.keys(this.form).includes(key)) {
            this.form[key] = data[key];
          }
        }
        this.initValue = data.address.split(",").join("/");
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  beforeMount() {
    this._ParkingDetailed();
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