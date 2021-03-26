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
        v-model="form[item.prop]"
        :placeholder="item.placeholder"
        :style="{ width: item.width }"
        :disabled="item.disable"
      ></el-input>
      <slot
        v-else-if="item.type === 'slot'"
        :placeholder="item.placeholder"
        :name="item.slotName"
      ></slot>
      <el-radio-group v-model="form[item.prop]">
        <el-radio
          v-for="item in item.options"
          :key="item.index"
          :label="item.label"
          >{{ item.value }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button
        v-for="item in formHandle"
        :key="item.index"
        :type="item.type"
        @click="item.handle && item.handle()"
        >{{ item.label }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "vueForm",
  data() {
    return {
      form: {},
    };
  },
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    formHandle: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    initFormData() {
      const formData = {};
      this.formItem.forEach((item) => {
        if (item.prop) {
          formData[item.prop] = item.value || "";
        }
      });
      this.form = formData;
    },
  },
  watch: {
    formItem: {
      handler(newValue, oldValue) {
        this.initFormData();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
</style>