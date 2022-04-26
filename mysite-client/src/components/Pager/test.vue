<template>
  <div>
    <h1>Pager组件</h1>
    <Pager :total="total" :current="current" @pageChange="handlePageChange" />
    <h2>{{ current }}</h2>
  </div>
</template>

<script>
import Pager from "./index.vue";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 1,
      total: 311,
    };
  },
  methods: {
    // 对子组件抛出的事件进行处理
    handlePageChange(newPage) {
      this.current = newPage;
      console.log(`加载当前页:${newPage} 的数据...`);
    },
  },
};
</script>

<style>
</style>