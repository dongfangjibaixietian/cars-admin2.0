<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column prop="parkingName" label="停车场名称" width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180">
        <!-- <template slot-scope="scope">
          <span>{{ getType(scope.row.type) }}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="" label="区域"> </el-table-column>
      <el-table-column prop="carsNumber" label="可停放车辆"> </el-table-column>
      <el-table-column prop="status" label="禁启用">
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
      </el-table-column>
      <el-table-column prop="lnglat" label="查看位置"> </el-table-column>
      <el-table-column label="操作">
        <!-- <template slot-scope="scoped">
          <el-button type="danger" size="small" @click="edit(scoped.row.id)"
            >编辑</el-button
          >
          <el-button size="small" @click="del(scoped.row.id)">删除</el-button>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tableData",
  data() {
      return {

      }
  },
  props: {
      config: {
          type: Object,
          default: () => {}
      }
  }
};
</script>

<style scoped lang="scss">
</style>