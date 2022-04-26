<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "icon-zhuye",
  success: "icon-zhengque",
  error: "icon-cuowu",
  close: "icon-guanbi",
  warn: "icon-jinggao",
  info: "icon-xinxi",
  blog: "icon-blog",
  code: "icon-code",
  about: "icon-set_about_hov",
  weixin: "icon-weixin1",
  email: "icon-email",
  github: "icon-github",
  qq: "icon-qq",
  arrowUp: "icon-arrow-up",
  arrowDown: "icon-arrow-down",
  empty: "icon-empty",
  chat: "icon-liuyan",
};
export const types = Object.keys(classMap);
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    // 图标类样式
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style scoped>
@import "//at.alicdn.com/t/font_3228301_4ok48q5uu4.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>