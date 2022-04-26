<template>
  <div @click="handleClick" v-show="show" class="to-top-container">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleMainScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleMainScroll);
  },
  methods: {
    handleMainScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick() {
      // 回到顶部
      this.$bus.$emit("setMainScroll", 0);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.to-top-container {
  height: 50px;
  width: 50px;
  position: fixed;
  z-index: 99;
  right: 25px;
  bottom: 25px;
  background: @primary;
  color: #fff;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>