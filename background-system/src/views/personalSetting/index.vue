<template>
  <div class="app-container">
    <el-form
      :model="adminForm"
      :rules="rules"
      ref="adminForm"
      label-width="100px"
      style="width: 500px"
    >
      <el-form-item label="用户名">
        <el-input
          v-model="adminForm.name"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          type="password"
          v-model="adminForm.oldLoginPwd"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          type="password"
          v-model="adminForm.loginPwd"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="adminForm.checkPass"
          placeholder="请确认新密码"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn-container">
        <el-button type="primary" style="margin-right: 20px" @click="handleEdit"
          >修改</el-button
        >
        <el-button type="danger" @click="handleBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setUser, getInfo } from "@/api/user";

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adminForm.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      adminForm: {
        name: "",
        oldLoginPwd: "",
        loginPwd: "",
        checkPass: "",
      },
      rules: {
        oldLoginPwd: [
          { required: true, trigger: "blur", message: "请输入旧的密码" },
        ],
        loginPwd: [
          { required: true, trigger: "blur", message: "请输入新的密码" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getInfo().then((res) => {
        this.adminForm = { ...res.data };
      });
    },
    handleEdit() {
      this.$refs.adminForm.validate((valid) => {
        if (valid) {
          console.log(this.adminForm);
          setUser(this.adminForm).then((res) => {
            if (typeof res === "string") {
              const resp = JSON.parse(res);
              this.$message.error(resp.msg);
            } else {
              this.$message.success("修改密码成功");
              this.$store.dispatch("user/logout").then(() => {
                this.$router.push(`/login`);
              });
            }
          });
        } else {
          this.$message.error("请填写完所有内容");
        }
      });
    },

    handleBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.btn-container {
  margin: 0 75px;
}
</style>