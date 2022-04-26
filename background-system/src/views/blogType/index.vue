<template>
  <div class="app-container">
    <!-- 输入框 -->
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入分类名称，左边选择分类等级"
        v-model="input"
        class="input-with-select input-blog-type"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 10px"
        @click="handleAddBlogType"
        >添加</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table :data="data" style="width: 100%" border v-loading.lock="loading">
      <el-table-column prop="date" label="序号" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="name" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="articleCount" label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
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
              @click="handleEditBlogType(scope.row)"
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
              @click="handleDelBlogType(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑博客分类"
      :visible.sync="dialogFormVisible"
      width="40%"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="类别名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类别等级">
          <el-select v-model="form.order" placeholder="分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddBlogType">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBlogType,
  getBlogTypes,
  getOneBlogType,
  editBlogType,
  deleteBlogType,
} from "@/api/blogType";

export default {
  data() {
    return {
      input: "",
      select: "1",
      data: [],
      loading: false,
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
      id: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getBlogTypes().then((res) => {
        this.data = res.data;
        this.loading = false;
      });
    },

    // 添加博客类别
    handleAddBlogType() {
      if (!this.input) {
        return this.$message.error("分类名称不能为空");
      }
      addBlogType({ name: this.input, order: this.select }).then(() => {
        this.fetchData();
        this.$message.success("添加成功");
        this.input = "";
        this.select = "1";
      });
    },

    // 编辑修改类别
    handleEditBlogType({ id }) {
      getOneBlogType(id).then((res) => {
        this.form = res.data;
        this.dialogFormVisible = true;
        this.id = id;
      });
    },

    // 确认修改类别
    confirmAddBlogType() {
      editBlogType({
        id: this.id,
        data: this.form,
      }).then(() => {
        this.fetchData();
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
      });
    },

    // 删除类别
    handleDelBlogType({ id, name }) {
      this.$confirm(
        `删除该类别后，该类别的文章将变成未分类，是否继续?`,
        `是否确认删除类别 ${name}`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogType(id).then(() => {
            this.fetchData();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.input-blog-type {
  width: 400px;
  margin-bottom: 20px;
}
</style>