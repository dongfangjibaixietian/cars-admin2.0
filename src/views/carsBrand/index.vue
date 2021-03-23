<template>
  <div>
    <!-- 表头 -->
    <el-row>
      <el-col :span="18"
        ><div class="formheader">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="车辆品牌">
              <el-input
                v-model="formInline.brand"
                placeholder="请输入品牌"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search()">查询</el-button>
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
    </div>
    <!-- 新增车辆弹出窗口 -->
    <addCarsBrand2 :dialogFormVisible.sync="dialogFormVisible" />
  </div>
</template>

<script>
import addCarsBrand2 from "../../components/dialog/addCarsBrand2";
// table组件
import tableData from "../../components/tableData";
export default {
  name: "index",
  components: { addCarsBrand2, tableData },
  data() {
    return {
      formInline: {
        brand: "",
      },
      //给表格组件传参数
      table_config: {
        tHead: [
          {
            prop: "imgUrl",
            label: "LOGO",
            type: "image",
            width: "50",
            imgWidth: "40",
          },
          {
            prop: "nameCh",
            label: "车辆品牌",
            type: "function",
            // 两种子组件调用父组件方法的方式，一种是遍历然后调用item.callback(),一种是插槽
            callback: (row) => {
              return `${row.nameCh}/${row.nameEn}`;
            },
          },

          { prop: "status", label: "禁启用", type: "slot", slotName: "status" },

          { prop: "", label: "操作", type: "slot", slotName: "operate" },
        ],
        checkBox: true,
        url: "/brand/list/",
        data: {
          pageSize: 10,
          pageNumber: 1,
        },
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
      dialogFormVisible: false,
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
  methods: {
    search() {
      const requestData = {
        pageSize: 10,
        pageNumber: 1,
      };
      if (this.formInline.brand) {
        requestData.brand = this.formInline.brand;
      };
      console.log(requestData);
      this.$refs.table.getTableList(requestData);
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
