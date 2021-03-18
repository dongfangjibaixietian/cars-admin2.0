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
                <el-option
                  v-for="item in parking_type"
                  :label="item.value"
                  :value="item.label"
                  :key="item.index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-select v-model="keyword" placeholder="请选择">
                <el-option label="停车场名称" value="parkingName"></el-option>
                <el-option label="关键字" value="address"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="key_value"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search()">查询</el-button>
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
      <tableData :config="table_config" ref="table">
        <!-- 在父组件里定义使用插槽的方法 -->
        <template v-slot:status="data">
          <el-switch
            v-model="data.data.status"
            @change="switchChange(data.data)"
            :disabled="data.data.id == switch_disable"
            active-value="2"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
        <template v-slot:operate="data">
          <el-button type="danger" size="small" @click="edit(data.data.id)"
            >编辑</el-button
          >
          <el-button
            size="small"
            :loading="data.data.id == delId"
            @click="del(data.data.id)"
            >删除</el-button
          >
        </template>
      </tableData>
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
import { ParkingList, ParkingDelate, ParkingStatus } from "../../api/parking";
import { GetCity } from "../../api/common";
// 组件
import tableData from "../../components/tableData";
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
      loading: false, //控制表格的加载
      switch_disable: "", //控制禁启用的加载
      delId: "", //控制删除按钮的加载
      //给表格组件传参数
      table_config: {
        tHead: [
          { prop: "parkingName", label: "停车场名称" },
          {
            prop: "type",
            label: "类型",
            type: "function",
            // 两种子组件调用父组件方法的方式，一种是遍历然后调用item.callback(),一种是插槽
            callback: (row) => {
              const data = this.parking_status.filter((item) => {
                return item.label == row.type;
              });
              if (data && data.length > 0) {
                return data[0].value;
              }
            },
          },
          {
            prop: "address",
            label: "区域",
            type: "function",
            callback: (row) => {
              let address = row.address.split(",");
              let addressInfo = "";
              addressInfo += address[0];
              if (address[1]) {
                addressInfo += `<br/>${address[1]}`;
              }
              return addressInfo;
            },
          },
          { prop: "carsNumber", label: "可停放车辆" },
          { prop: "status", label: "禁启用", type: "slot", slotName: "status" },
          { prop: "lnglat", label: "查看位置" },
          { prop: "", label: "操作", type: "slot", slotName: "operate" },
        ],
        checkBox: true,
        url: "/parking/list/",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
      },
      form: {
        user: "",
        region: "",
        type: "", //室内室外
        status: "", //禁启用
        area: "",
      },
      keyword: "", //关键字的key
      key_value: "", //关键字的值
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
  components: { tableData },
  methods: {
    // 搜索的时候调接口方法更新列表就行了
    search() {
      console.log(this.form);
      this.getParkingList();
    },
    switchChange(val) {
      const requestData = {
        id: val.id,
        status: val.status,
      };
      // 这里的判断依据是，val.id是行里面固有的，因此只需要再定义一个变量赋值进去，两者相等就能等到true值
      this.switch_disable = val.id;
      ParkingStatus(requestData)
        .then((res) => {
          this.$message({
            type: "success",
            message: res.message,
          });
          // 将变量置空，两者不相等，为false值
          this.switch_disable = "";
        })
        .catch((error) => {
          this.switch_disable = "";
        });
    },
    edit(id) {
      this.$router.push({
        name: "add",
        query: {
          id: id,
        },
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delId = id;
          ParkingDelate({ id: id }).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //删除完之后重新请求列表，就可以实现对列表数据的实时刷新
            this.$refs.table.getTableList();
            this.delId = "";
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          this.delId = "";
        });
    },
    getParkingList() {
      const requestData = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      };
      const filterData = JSON.parse(JSON.stringify(this.form));
      // 拿json对象里面的key的方法,通过循环可以拿到所有的jsonkey值
      for (let key in filterData) {
        //filterData[key]是拿循环里面所有key对应值的方法
        if (filterData[key]) {
          // 下面是给json对象添加新key新值的方法，等号左边是添加新key，等号右边是添加key对应的新值。
          requestData[key] = filterData[key];
        }
      }
      // 下面是对关键字的key跟value值进行判断，有的话就一起添加进requestData对象中。
      if (this.keyword && this.key_value) {
        requestData[this.keyword] = this.key_value;
      }
      this.loading = true;
      ParkingList(requestData)
        .then((res) => {
          const data = res.data;
          this.tableData = data.data;
          this.total = data.total;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = true;
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
    getType(val) {
      const data = this.parking_status.filter((item) => {
        return item.label == val;
      });
      if (data && data.length > 0) {
        return data[0].value;
      }
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
