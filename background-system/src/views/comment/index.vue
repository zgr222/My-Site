<template>
  <div class="app-container">
    <el-table
      :data="data"
      style="width: 100%"
      border
      v-loading.lock="loading"
      element-loading-text="加载数据中"
      highlight-current-row
    >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{
          scope.$index + (curPage - 1) * limit + 1
        }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="100">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            size="small"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="评论文章" align="center">
        <template slot-scope="scope">{{ scope.row.blog.title }}</template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="评论日期" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDeleteComment(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      style="margin-top: 30px"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :page-sizes="[5, 10, 20]"
      :page-size="limit"
      :total="totalCount"
      :current-page.sync="pagerCurPage"
      @prev-click="handlePrev"
      @next-click="handleNext"
      @size-change="handlePageSizeChange"
      @current-change="handleCurPageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { formatDate } from "@/utils/formatDate";
import { getComments, deleteComment } from "@/api/comment";

export default {
  data() {
    return {
      data: [],
      srcList: [], //预览图数组
      limit: 5, //每页显示条数
      curPage: 1, //当前页码，默认第一页
      totalCount: 0, //数据总条数
      totalPage: 0, //总页数
      pagerCurPage: 1, //分页栏当前页码
      loading: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getComments(this.curPage, this.limit).then(({ data }) => {
        this.loading = false;
        this.data = data.rows;
        for (const item of this.data) {
          item.createDate = formatDate(item.createDate);
        }
        this.totalCount = data.total;
        this.totalPage = Math.ceil(this.totalCount / this.limit);
        if (this.curPage > this.totalPage) {
          this.curPage = this.totalPage;
          this.fetchData();
        }
      });
    },

    handleDeleteComment({ id }) {
      this.$confirm(`是否确认删除此评论?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment(id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    handlePageSizeChange(limit) {
      this.limit = +limit;
      this.curPage = 1;
      this.pagerCurPage = 1;
      this.fetchData();
    },

    handleCurPageChange(pageNum) {
      this.curPage = +pageNum;
      this.fetchData();
    },
    handlePrev() {
      this.curPage--;
    },
    handleNext() {
      this.curPage++;
    },
  },
};
</script>

<style>
</style>