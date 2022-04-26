import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://img1.baidu.com/it/u=811678410,3534249775&fm=253&fmt=auto&app=138&f=JPEG?w=502&h=500",
    siteTitle: "我的个人空间",
    github: "https://github.com/zgr222",
    qq: "529268260",
    qqQrCode:
      "https://s3.bmp.ovh/imgs/2022/03/194cb768a2c32cf7.jpg",
    weixin: "wechatZGR0222",
    weixinQrCode:
      "https://s3.bmp.ovh/imgs/2022/03/8a1454a4d070dba8.jpg",
    mail: "duyi@gmail.com",
    icp: "黑ICP备17001719号",
    githubName: "zgr222",
    favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
  },
});
