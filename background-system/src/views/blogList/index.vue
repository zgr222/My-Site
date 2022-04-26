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
      <el-table-column prop="date" label="序号" width="80" align="center">
        <template slot-scope="scope">{{
          scope.$index + (curPage - 1) * limit + 1
        }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="handleGoToTitle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        prop="description"
        label="文章描述"
        width="200"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="110"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column
        prop="commentNumber"
        label="评论量"
        width="110"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column
        prop="category"
        label="所属分类"
        width="110"
        align="center"
      >
        <template slot-scope="scope">{{
          scope.row.category === null ? "未分类" : scope.row.category.name
        }}</template>
      </el-table-column>

      <el-table-column
        prop="createDate"
        label="创建日期"
        width="230"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="handleEditBanner(scope.row)"
            ></el-button>
          </el-tooltip>

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
              @click="deleteBlog(scope.row)"
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
import * as blogApi from "@/api/blog";
import { server_URL, frontEnd_URL } from "@/urlConfig";
import { formatDate } from "@/utils/formatDate";

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
      blogApi.getBlogs(this.curPage, this.limit).then(({ data }) => {
        this.data = data.rows;
        for (const item of this.data) {
          item.createDate = formatDate(item.createDate);
          // item.thumb = server_URL + item.thumb;
          this.srcList.push(item.thumb);
        }
        this.totalCount = data.total;
        this.totalPage = Math.ceil(this.totalCount / this.limit);
        if (this.curPage > this.totalPage) {
          this.curPage = this.totalPage;
          this.fetchData();
        }
        this.loading = false;
      });
    },

    // 点击标题跳转到该文章
    handleGoToTitle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
    },

    // 跳转到编辑页面
    handleEditBanner(blogInfo) {
      // this.$router.push(`/blog/editBlog/${blogInfo.id}`);
      this.$router.push({ name: "EditBlog", params: { id: blogInfo.id } });
    },

    deleteBlog(blogInfo) {
      this.$confirm(
        `是否确认删除文章 “${blogInfo.title}” 以及相关评论?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          blogApi.deleteBlog(blogInfo.id).then(() => {
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