<template>
  <div>
    <!-- 表头 -->
    <el-row>
      <el-col :span="21"
        ><div class="formheader">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="区域">
              <el-cascader
                v-model="form.area"
                :options="options"
                :props="props"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="活动区域">
                <el-option label="室内" value="1"></el-option>
                <el-option label="室外" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="禁启用">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option v-for="item in parking_type" :label="item.value" :value="item.label" :key="item.index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-select v-model="keyword" placeholder="请选择">
                <el-option label="停车场名称" value="parkingName"></el-option>
                <el-option label="关键字" value="address"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="key_value" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div></el-col
      >
      <el-col :span="3">
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
      <div>
        <el-row class="page">
          <el-col :span="4" class="space-occupying"> </el-col>
          <el-col :span="20">
            <el-pagination
              class="pull-right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { ParkingList } from "../../api/parking";
import { GetCity } from "../../api/common";
export default {
  name: "index",
  data() {
    const _this = this;
    return {
      total: null,
      currentPage4: 1,
      pageSize: 10,
      pageNumber: 1,
      parking_type: this.$store.state.config.parking_type,
      parking_status: this.$store.state.config.parking_status,
      form: {
        user: "",
        region: "",
        type: "",//室内室外
        status: "",//禁启用
        area: "",
      },
      keyword:"", //关键字的key
      key_value:"", //关键字的值
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
            }
            // 下面专门存储省市区的数据
            resolve(data);
          });
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          // resolve(nodes);
        },
      },
      value: [],
      options: [],
      address: [],
      tableData: [],
    };
  },
  methods: {
    // 搜索的时候调接口方法更新列表就行了
    search(){
      console.log(this.form);
      this.getParkingList();
    },
    getParkingList() {
      const requestData = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };
      const filterData = JSON.parse(JSON.stringify(this.form));
      // 拿json对象里面的key的方法,通过循环可以拿到所有的jsonkey值
      for(let key in filterData) {
      //filterData[key]是拿循环里面所有key对应值的方法
        if(filterData[key]){
          // 下面是给json对象添加新key新值的方法，等号左边是添加新key，等号右边是添加key对应的新值。
          requestData[key] = filterData[key];
        }
      };
      // 下面是对关键字的key跟value值进行判断，有的话就一起添加进requestData对象中。
      if(this.keyword && this.key_value) {
        requestData[this.keyword] = this.key_value
      }
      console.log(requestData);
      ParkingList(requestData).then((res) => {
        const data = res.data;
        this.tableData = data.data;
        this.total = data.total;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getParkingList();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getParkingList();
    },
  },
  beforeMount() {
    this.getParkingList();
  },
};
</script>

<style lang="scss" scoped>
.newPark {
  float: right;
}
.space-occupying {
  padding-top: 2px;
}
.page {
  padding-top: 20px;
}
</style>
