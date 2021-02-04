<template>
  <div>
    <!-- 表头 -->
    <el-row>
      <el-col :span="18"
        ><div class="formheader">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="车辆品牌：">
              <el-select v-model="formInline.region" placeholder="选择品牌">
                <el-option label="品牌一" value="shanghai"></el-option>
                <el-option label="品牌二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌型号：">
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div></el-col
      >
      <el-col :span="6">
        <el-button
          type="danger"
          class="newPark"
          @click="dialogFormVisible = true"
          >新增车辆品牌</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格数据 -->
    <div class="tablecontent">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column prop="name" label="停车场名称" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="area" label="区域"> </el-table-column>
        <el-table-column prop="carsNumber" label="可停放车辆">
        </el-table-column>
        <el-table-column prop="disable" label="禁启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.disable"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="查看位置"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small">编辑</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增车辆弹出窗口 -->
    <div class="dialogcontent">
      <el-dialog title="新增车辆品牌" :visible.sync="dialogFormVisible" center>
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      value: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
              ],
            },
          ],
        },
      ],
      tableData: [
        {
          name: "南山停车场",
          type: "室外停车场",
          area: "上海市普陀区金沙江路 1518 弄",
          carsNumber: 20,
          disable: 0,
          address: "12334 ,1234",
        },
      ],
      dialogFormVisible: true,
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
      formLabelWidth: "120px",
    };
  },
};
</script>

<style lang="scss" scoped>
.newPark {
  float: right;
}
.logoContent {
  display: flex;
  .uploadImg {
    width: 150px;
    height: 150px;
    line-height: 150px;
    border: 1px solid #ccc;
    text-align: center;
    &::after {
      content: "+";
    }
  }
  .imgList {
    flex: 1;
    padding-left: 30px;
  }
}
</style>
