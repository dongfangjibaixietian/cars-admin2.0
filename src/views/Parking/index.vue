<template>
  <div>
    <!-- 表头 -->
    <el-row>
      <el-col :span="18"
        ><div class="formheader">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="停车场名称">
              <el-input
                v-model="formInline.user"
                placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item label="区域">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div></el-col
      >
      <el-col :span="6">
          <router-link to="/add">
          <el-button type="danger" class="newPark">新增停车场</el-button>
          </router-link>
      </el-col>
    </el-row>

    <!-- 表格数据 -->
    <div class="tablecontent">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column prop="parkingName" label="停车场名称" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="address" label="区域"> </el-table-column>
        <el-table-column prop="carsNumber" label="可停放车辆">
        </el-table-column>
        <el-table-column prop="status" label="禁启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="2"
              inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="lnglat" label="查看位置"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small">编辑</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ParkingList } from "../../api/parking";
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
      tableData: [],
    };
  },
  methods: {
    getParkingList() {
      const requestData = {
      pageSize: 10,
      pageNumber: 1
    };
      ParkingList(requestData).then((res) => {
        const data = res.data;
        this.tableData = data.data;
        console.log(this.tableData);
      })
    }
  },
 beforeMount(){
   this.getParkingList();
 }
};
</script>

<style lang="scss" scoped>
.newPark {
    float: right;
}
</style>
