<template>
  <van-picker
    title="标题"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    value-key="label"
  />
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      require: true,
    },
    type: {
      require: true,
      type: [String, Object],
    },
  },
  methods: {
    onCancel() {
      this.$emit('close')
      console.log('关闭弹窗')
    },
    onConfirm(values) {
      this.$emit('update:type', values)
      this.$emit('close')
    },
  },
}
</script>

<style>
</style>