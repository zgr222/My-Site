<template>
  <div class="test-container">
    <Layout>
      <template v-slot:left>
        <div class="left">
          左边区域
          <p>zuozuozuo</p>
        </div>
      </template>
      <div class="main">主区域</div>
      <template #right>
        <div class="right">
          右边区域
          <p>zuozuozuo</p>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import "@/styles/global.less";
export default {
  components: {
    Layout,
  },
};
</script>

<style scoped>
.test-container {
  width: 700px;
  height: 600px;
  border: 2px solid;
  margin: 0 auto;
}
.left {
  width: 200px;
  height: 100%;
  background: lightblue;
}
.main {
  width: 100%;
  height: 100%;
  background: lightcoral;
}
.right {
  width: 150px;
  height: 100%;
  background: lightgreen;
}
</style>
