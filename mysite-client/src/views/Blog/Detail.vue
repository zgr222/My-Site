<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail.vue";
import BlogTOC from "./components/BlogTOC.vue";
import { getBlog } from "@/api/blog.js";
import BlogComment from "./components/BlogComment.vue";
import mainScroll from "@/mixins/mainScroll";
import { titleController } from "@/utils";
export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  methods: {
    async fetchData() {
      let resp = await getBlog(this.$route.params.id);
      // resp = null;
      if (!resp) {
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.main-container {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  .scroll-bar();
}
.right-container {
  width: 200px;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  .scroll-bar();
}
</style>