<template>
  <div class="app-container">
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
      <el-form-item label="项目预览图">
        <UpLoad v-model="form.thumb" />
      </el-form-item>
      <el-form-item label="项目等级">
        <el-select v-model="form.order" placeholder="项目等级">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="confirmAddProject">发布项目</el-button>
  </div>
</template>

<script>
import UpLoad from "@/components/UpLoad.vue";
import { addProject } from "@/api/project";

export default {
  components: { UpLoad },
  data() {
    return {
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
  methods: {
    confirmAddProject() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = +this.form.order;
      addProject(obj).then(() => {
        this.$router.push({ name: "ProjectsList" });
        this.$message.success("添加项目成功");
      });
    },
  },
};
</script>

<style>
</style>