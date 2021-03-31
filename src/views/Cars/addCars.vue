<template>
  <div class="addContent">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="车辆品牌">
        <el-select v-model="form.brand" placeholder="选择品牌">
          <el-option label="奔驰" value="benchi"></el-option>
          <el-option label="宝马" value="baoma"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车辆型号">
        <el-select v-model="form.model" placeholder="选择型号">
          <el-option label="奔驰" value="benchi"></el-option>
          <el-option label="宝马" value="baoma"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="停车场">
        <el-select v-model="form.park" placeholder="选择停车场">
          <el-option
            v-for="item in options"
            :key="item.index"
            :label="item.parkingName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="车牌号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="车架号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="发动机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="年检">
        <el-radio-group v-model="form.resource">
          <el-radio label="已检"></el-radio>
          <el-radio label="未检"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="保养日期">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="6">下次保养日期：2020-12-12</el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="档位">
        <el-radio-group v-model="form.resource">
          <el-radio label="自动挡"></el-radio>
          <el-radio label="手动"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="能源类型">
        <el-radio-group v-model="form.energyType">
          <el-radio label="1">电</el-radio>
          <el-radio label="2">油</el-radio>
          <el-radio label="3">混合</el-radio>
        </el-radio-group>
        <div
          class="progress-bar-wrap"
          v-if="form.energyType == 1 || form.energyType == 3"
        >
          <span class="label-text">电量：</span>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="progress-bar">
                <span style="width: 50%">
                  <label>50%</label>
                </span>
              </div>
            </el-col>
            <el-col :span="2">
              <el-input size="small" value="100"> </el-input>
            </el-col>
          </el-row>
        </div>
        <div
          class="progress-bar-wrap"
          v-if="form.energyType == 2 || form.energyType == 3"
        >
          <span class="label-text">油量：</span>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="progress-bar">
                <span style="width: 50%">
                  <label>50%</label>
                </span>
              </div>
            </el-col>
            <el-col :span="2">
              <el-input size="small" value="100"> </el-input>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="禁启用">
        <el-radio-group v-model="form.resource">
          <el-radio label="禁用"></el-radio>
          <el-radio label="启用"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="车辆属性">
        <div
          class="cars-property-wrap"
          v-for="(item, index) in carsList"
          :key="item.key"
        >
          <el-row :gutter="20">
            <el-col :span="5">
              <el-input value="item.key" v-model="item.key"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input value="item.value" v-model="item.value"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button v-if="index == 0" type="primary" @click="addAttr"
                >+</el-button
              >
              <el-button v-else>-</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="车辆描述">
        <!-- 富文本编辑器的dom元素 -->
        <div ref="editorDom" style="text-align: left"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="danger">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//富文本编辑器
import Editor from "wangeditor";

// api
import { GetParking } from "../../api/common";
export default {
  name: "add",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        brand: "",
        model: "",
        park: "",
        delivery: false,
        energyType: "1",
        type: [],
        resource: "",
        desc: "",
      },
      options: [],
      carsList: [
        { key: 111, value: 111 },
        { key: 222, value: 222 },
        { key: 333, value: 333 },
        { key: 444, value: 444 },
      ],
      // 富文本对象
      editor: null,
    };
  },
  mounted() {
    this.createEditor();
    this._GetParking();
  },
  methods: {
    addAttr() {
      this.carsList.push({ key: 555, value: 555 });
    },
    // 获取停车场
    _GetParking() {
      GetParking().then((res) => {
        // this.form.park = res.data.data;
        // console.log(this.form.park);
        const data = res.data.data;
        if (data) {
          this.options = data;
        }
      });
    },
    // 创建富文本对象
    createEditor() {
      this.editor = new Editor(this.$refs.editorDom);
      this.editor.customConfig.onchange = (html) => {};
      // 下面是创建富文本实例
      this.editor.create();
    },
  },
};
</script>

<style lang="scss" scoped>
.address-map {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
.progress-bar-wrap {
  padding-left: 50px;
  position: relative;
  .label-text {
    position: absolute;
    left: 0;
  }
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ccc;
  border-radius: 50px;
  margin-top: 15px;
  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background-color: #409eff;
    label {
      position: absolute;
      right: -10px;
      bottom: 10%;
    }
  }
}
.cars-property-wrap {
  margin-top: 10px;
}
</style>