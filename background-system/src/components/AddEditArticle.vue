<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    />

    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>

    <UpLoad uploadTitle="文章头图" v-model="form.thumb" />

    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      slot="prepend"
      placeholder="请选择文章分类"
      @change="change"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>

    <div>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="handleAddArticle"
        >{{ btnContent }}</el-button
      >
      <el-button
        v-if="mode === 'edit'"
        type="danger"
        style="margin-top: 15px; margin-left: 15px"
        @click="handleBack"
        >取消修改</el-button
      >
    </div>
  </div>
</template>

<script>
import UpLoad from "@/components/UpLoad.vue";
import { getBlogTypes } from "@/api/blogType";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import { addBlog, editBlog, getOneBlog } from "@/api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn";

export default {
  props: ["mode"],
  components: { UpLoad, Editor },
  data() {
    return {
      form: {
        title: "",
        description: "",
        editorText: "",
        thumb: "",
        select: "",
      },
      blogType: [],
      editorOptions: {
        language: "zh-CN",
      },
      id: null,
      btnContent: "发布文章",
    };
  },
  created() {
    getBlogTypes().then((res) => {
      this.blogType = res.data;
    });
    if (this.mode === "edit") {
      this.id = this.$route.params.id;
      getOneBlog(this.id).then((res) => {
        this.form = res.data;
        this.form.select =
          res.data.category === null ? "" : res.data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", res.data.htmlContent);
      });
      this.btnContent = "确认修改";
    }
  },
  methods: {
    handleAddArticle() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");

      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      if (obj.title && obj.description && obj.categoryId && obj.htmlContent) {
        if (this.mode === "add") {
          addBlog(obj).then(() => {
            this.$message.success("文章添加成功");
            this.$router.push({ name: "BlogList" });
          });
        } else {
          editBlog({ id: this.id, data: obj }).then(() => {
            this.$message.success("文章修改成功");
            this.$router.push({ name: "BlogList" });
          });
        }
      } else {
        this.$message.warning("请填写所有内容");
      }
    },

    change() {
      this.$forceUpdate();
    },

    handleBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>