<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <!-- <router-view /> -->
        <RouterView />
      </template>
    </Layout>
    <ToTop />
    <!-- <AsyncComponent /> -->
  </div>
</template>

<script>
// 异步组件示例
// const AsyncComponent = () => {
//   return new Promise((resolve) => {
//     setTimeout(async () => {
//       const MyComp = await import("./MyComp");
//       resolve(MyComp);
//     }, 3000);
//   });
// };

import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import ToTop from "./components/ToTop";
import "@/styles/global.less";
export default {
  components: {
    Layout,
    SiteAside,
    ToTop,
    // AsyncComponent,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
}
.aside {
  width: 220px;
  height: 100%;
}
</style>
