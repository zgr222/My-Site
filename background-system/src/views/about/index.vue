<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input
      v-model="url"
      placeholder="请输入内容"
      :disabled="disabled"
    ></el-input>
    <el-button type="primary" style="margin-top: 15px" @click="hanleClick">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getAboutMeInfo, setAboutMeInfo } from "@/api/about";

export default {
  data() {
    return {
      url: "",
      disabled: true,
      btnContent: "编辑",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAboutMeInfo().then((res) => {
        this.url = res.data;
      });
    },
    hanleClick() {
      if (this.btnContent === "编辑") {
        this.disabled = false;
        this.btnContent = "完成";
      } else {
        if (!this.url) {
          his.$message.warning("输入内容不能为空");
        } else {
          setAboutMeInfo({ url: this.url.trim() }).then(() => {
            this.$message.success("修改成功");
            this.disabled = true;
            this.btnContent = "编辑";
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>