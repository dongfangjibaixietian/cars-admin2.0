<template>
  <el-form ref="form" :model="form" label-width="90px">
    <el-form-item
      v-for="item in formItem"
      :label="item.label"
      :key="item.index"
      :prop="item.prop"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="form.parkingName"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        :disabled="item.disable"
      ></el-input>
      <slot
        v-else-if="item.type === 'slot'"
        :placeholder="item.placeholder"
        :name="item.slotName"
      ></slot>
      <el-radio-group>
        <el-radio
          v-for="item in item.options"
          :key="item.index"
          :label="item.label"
          >{{ item.value }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "vueForm",
  data() {
    return {
      form: {
        parkingName: "",
      },
    };
  },
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
</style>