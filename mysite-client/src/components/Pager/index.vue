<template>
  <!-- 只有总页数大于1时才显示分页 -->
  <div class="pager-container" v-if="pageNumber > 1">
    <!-- 下面注释点击事件时错误做法，不能改变父组件传过来的数据current，
		对此可以抛出事件，交由父组件处理 -->
    <!-- <a @click="current = 1" :class="{ disabled: current === 1 }">|&lt;&lt;</a> -->

    <a @click="handlerClick(1)" :class="{ disabled: current === 1 }">
      |&lt;&lt;
    </a>
    <a @click="handlerClick(current - 1)" :class="{ disabled: current === 1 }">
      &lt;&lt;
    </a>
    <a
      @click="handlerClick(n)"
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
    >
      {{ n }}
    </a>
    <a
      @click="handlerClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
    >
      &gt;&gt;
    </a>
    <a
      @click="handlerClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
    >
      &gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    //总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    visibleMin() {
      let min = this.current - Math.floor(this.limit / 2);
      min < 1 && (min = 1);
      return min;
    },
    visibleMax() {
      let max = this.visibleMin + this.limit - 1;
      max > this.pageNumber && (max = this.pageNumber);
      return max;
    },
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handlerClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      // 抛出一个事件 $emit(自定义名称, 传递参数)
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang='less' scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    cursor: pointer;
    margin: 0 6px;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>