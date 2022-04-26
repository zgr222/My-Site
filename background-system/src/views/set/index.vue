<template>
  <div class="app-container" v-loading.lock="loading">
    <div class="block">网站信息</div>
    <div class="block2">网站标题</div>
    <div class="input-container">
      <el-input v-model="form.siteTitle"></el-input>
    </div>
    <div class="block2">邮箱</div>
    <div class="input-container">
      <el-input v-model="form.mail"></el-input>
    </div>
    <div class="block2">备案号</div>
    <div class="input-container">
      <el-input v-model="form.icp"></el-input>
    </div>
    <el-divider></el-divider>

    <div class="block">网站头像信息</div>
    <div class="upload-content">
      <UpLoad :size="100" v-model="form.avatar" />
    </div>
    <el-divider></el-divider>

    <div class="block">网址图标信息</div>
    <div class="block2">网址图标地址</div>
    <div class="input-container">
      <el-input v-model="form.favicon" placeholder="请输入图片地址"></el-input>
    </div>
    <div class="block2">网址图标预览</div>
    <div class="upload-content">
      <UpLoad :size="50" v-model="form.favicon" />
    </div>
    <el-divider></el-divider>

    <div class="block">github 信息</div>
    <div class="block2">github 名字</div>
    <div class="input-container">
      <el-input v-model="form.githubName"></el-input>
    </div>
    <div class="block2">github 地址</div>
    <div class="input-container">
      <el-input v-model="form.github"></el-input>
    </div>
    <el-divider></el-divider>

    <div class="block">QQ 信息</div>
    <div class="block2">QQ 号码</div>
    <div class="input-container">
      <el-input v-model="form.qq"></el-input>
    </div>
    <div class="block2">QQ 二维码图片预览</div>
    <div class="upload-content">
      <UpLoad :size="100" v-model="form.qqQrCode" />
    </div>
    <el-divider></el-divider>

    <div class="block">微信信息</div>
    <div class="block2">微信号</div>
    <div class="input-container">
      <el-input v-model="form.weixin"></el-input>
    </div>
    <div class="block2">微信二维码图片预览</div>
    <div class="upload-content">
      <UpLoad :size="100" v-model="form.weixinQrCode" />
    </div>
    <el-divider></el-divider>

    <el-button type="primary" @click="confirmEdit">确认修改</el-button>
  </div>
</template>

<script>
import UpLoad from "@/components/UpLoad.vue";
import { getSetting, setSetting } from "@/api/setting";

export default {
  components: { UpLoad },
  data() {
    return {
      form: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      loading: false,
      form2: {
        avatar: "",
        qqQrCode: "",
        weixinQrCode: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getSetting().then((res) => {
        this.loading = false;
        this.form = { ...res.data };
      });
    },
    confirmEdit() {
      setSetting(this.form).then(() => {
        this.fetchData();
        this.$message.success("修改成功");
      });
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-size: 20px;
  font-weight: 100;
}
.block2 {
  margin: 15px 0;
  font-size: 14px;
  font-weight: 100;
}
.input-container {
  margin-bottom: 15px;
  width: 500px;
}
.upload-content {
  margin-bottom: 15px;
}
</style>