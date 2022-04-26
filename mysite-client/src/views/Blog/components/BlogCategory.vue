<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import fetchData from "@/mixins/fetchData.js";
import { getBlogCategroies } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    routeInfo() {
      const categoryId = this.$route.params.categoryId || -1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        limit,
      };
    },
    list() {
      const totalArticalCount = this.data.reduce((a, b) => {
        return a + b.articleCount;
      }, 0);
      const result = [
        { name: "全部", id: -1, articleCount: totalArticalCount },
        ...this.data,
      ];
      return result.map((item) => ({
        ...item,
        isSelect: item.id === this.routeInfo.categoryId,
        aside: `${item.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogCategroies();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.routeInfo.limit,
      };
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        console.log("wojinlaile");
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.blog-category-container {
  width: 200px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  .scroll-bar();
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>