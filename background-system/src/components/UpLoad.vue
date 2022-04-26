<template>
  <div class="container">
    <div class="block">{{ uploadTitle }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img
        v-if="value"
        :src="imageUrl"
        class="avatar"
        :style="{ width: size + 'px', height: size + 'px' }"
      />
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
        :style="{
          width: size + 'px',
          height: size + 'px',
          lineHeight: size + 'px',
        }"
      ></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  // props: ["uploadTitle", "value", "size"],
  props: {
    uploadTitle: { type: String },
    value: { type: String },
    size: {
      default: 150,
    },
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
    imageUrl() {
      if (this.value) {
        // return server_URL + this.value;
        return this.value;
      }
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit("input", res.data);
        console.log("upload..", res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  // width: 178px;
  // height: 178px;
  // line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  // width: 178px;
  // height: 178px;
  display: block;
}
</style>