<template>
  <div class="cotainer">
    <MessageArea
      title="用户评论"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";

export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: { MessageArea },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleMainScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleMainScroll);
  },
  methods: {
    handleMainScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100; // 误差100左右认为到达底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      if (!resp) {
        callback("评论失败", "error");
      } else {
        this.data.rows.unshift(resp);
        this.data.total++;
        callback("评论成功", "success");
      }
    },
  },
};
</script>

<style>
</style>