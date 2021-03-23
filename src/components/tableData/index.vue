<template>
  <div>
    <el-table
      :data="table_data"
      border
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
      style="width: 100%"
    >
      <el-table-column
        v-if="config.checkBox"
        type="selection"
        width="45"
      ></el-table-column>
      <!-- 可以用一个template占位进行v-for的循环 -->
      <template v-for="item in config.tHead">
        <!-- 这里放的是表头的内容 -->
        <el-table-column
          v-if="item.type === 'function'"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
        >
          <!-- 这里放的是表里面的内容,用template占位符表示 -->
          <template slot-scope="scoped">
            <!-- template占位符下面都要跟一个根标签 -->
            <!-- v-html表示解析成html标签的形式，{{}}表示解析为纯文本 -->
            <span v-html="item.callback && item.callback(scoped.row)"></span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'slot'"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scoped">
            <!-- {{scoped.row}} -->
            <slot :name="item.slotName" :data="scoped.row"></slot>
          </template>
        </el-table-column>
        <!-- 下面是列 -->
        <el-table-column
          v-else-if="item.type === 'image'"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
        <!-- 这里展示的列里面的template -->
          <template slot-scope="scoped">
            <img :src="scoped.row.imgUrl" :alt="scoped.row.prop" :width="item.imgWidth || 50">
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>
      </template>
      <!-- <el-table-column prop="type" label="类型" width="180"> -->
      <!-- <template slot-scope="scope">
          <span>{{ getType(scope.row.type) }}</span>
        </template> -->
      <!-- </el-table-column>
      <el-table-column prop="" label="区域"> </el-table-column>
      <el-table-column prop="carsNumber" label="可停放车辆"> </el-table-column>
      <el-table-column prop="status" label="禁启用"> -->
      <!-- <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="2"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template> -->
      <!-- </el-table-column>
      <el-table-column prop="lnglat" label="查看位置"> </el-table-column>
      <el-table-column label="操作"> -->
      <!-- <template slot-scope="scoped">
          <el-button type="danger" size="small" @click="edit(scoped.row.id)"
            >编辑</el-button
          >
          <el-button size="small" @click="del(scoped.row.id)">删除</el-button>
        </template> -->
      <!-- </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { GetTableData } from "../../api/common";
export default {
  name: "tableData",
  data() {
    return {
      tableLoading: false,
      table_config: {
        tHead: [],
        checkBox: true,
        url: "",
        data: {},
      },
      table_data: [],
    };
  },
  methods: {
    initConfig() {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
      }
      console.log(this.table_config);
      this.loadData();
    },
    loadData() {
      const requestData = {
        url: this.table_config.url,
        data: this.table_config.data,
      };
      this.tableLoading = true;
      GetTableData(requestData).then((res) => {
        this.tableLoading = false;
        const data = res.data;
        this.table_data = data.data;
      }).catch((err)=>{
          this.tableLoading = false; 
      });
    },
    getTableList(val) {
      if (val) {
      }
      this.loadData();
    },
    beforeMount() {},
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    config: {
      handler(newvalue, oldvalue) {
        this.initConfig();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss"></style>
