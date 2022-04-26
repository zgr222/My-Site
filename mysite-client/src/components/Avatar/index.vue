<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script>
// props属性有两种类型，数组和对象
export default {
  //   props: ["url"],
  props: {
    url: {
      type: String, //规定传入数据为String类型
      required: true, //属性必传
    },
    size: {
      type: Number,
      default: 150, // 默认值
    },
  },
};
</script>

<style scoped>
/* scoped 带有作用域的样式 作用类似css.module */
.avatar-container {
  display: block;
  border-radius: 50%;
}
</style>