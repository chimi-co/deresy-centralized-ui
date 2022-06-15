<template>
  <el-descriptions title="" :column="1" border>
    <el-descriptions-item :label="keyName" label-align="right">
      {{ value }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: ['keyName', 'value'],
    components: {},
    setup() {
      return {}
    },
  })
</script>
<style>
  .is-right {
    box-sizing: border-box;
    text-align: left;
    font-weight: 400;
    line-height: 23px;
    font-size: 14px;
    max-width: 250px !important;
    width: 250px !important;
  }
</style>
