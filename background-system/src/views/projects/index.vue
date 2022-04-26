<template>
  <div class="app-container">
    <el-table
      :data="data"
      style="width: 100%"
      border
      v-loading.lock="loading"
      element-loading-text="加载数据中"
    >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column label="项目名称" width="150" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>

      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column label="预览图" width="150" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 120px"
            :src="scope.row.thumb2"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="Github"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="primary"
              icon="iconfont icon-github"
              circle
              size="mini"
              class="github"
              @click="handleOpenGithub(scope.row)"
            ></el-button>
          </el-tooltip>
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
              @click="handleEditProjcect(scope.row)"
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
              @click="handelDeleteProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑项目信息"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分割）">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="Github 地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <UpLoad v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="排序等级">
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
        <el-button type="primary" @click="confirmEditProject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { server_URL, frontEnd_URL } from "@/urlConfig";
import { getProjects, editProject, deleteProject } from "@/api/project";
import UpLoad from "@/components/UpLoad.vue";

export default {
  components: { UpLoad },
  data() {
    return {
      data: [],
      srcList: [], //预览图数组
      loading: false,
      dialogFormVisible: false,
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1,
        id: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getProjects().then(({ data }) => {
        this.loading = false;
        this.data = data;
        for (const item of this.data) {
          item.description = item.description.toString();
          item.thumb2 = server_URL + item.thumb;
          this.srcList.push(item.thumb2);
        }
      });
    },

    // 跳转到github
    handleOpenGithub(projectInfo) {
      window.open(projectInfo.github);
    },

    // 编辑项目
    handleEditProjcect(projectInfo) {
      this.dialogFormVisible = true;
      console.log(projectInfo);
      this.form = {
        ...projectInfo,
        description: projectInfo.description.toString(),
      };
    },

    // 确认修改项目
    confirmEditProject() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = +this.form.order;
      editProject(obj.id, obj).then(() => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("修改成功");
      });
    },

    handelDeleteProject(projectInfo) {
      this.$confirm(`是否确认删除项目 “${projectInfo.name}” ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(projectInfo.id).then(() => {
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
  },
};
</script>

<style lang="scss" scoped>
.proName:hover {
  color: rgb(163, 163, 163);
}
.github {
  background-color: rgb(163, 163, 163);
  border: 1px solid rgb(163, 163, 163);
}
</style>