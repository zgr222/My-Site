export default function (refVal) {
  return {
    mounted() {
      this.$bus.$on("setMainScroll", this.handleSetMainScroll);
      this.$refs[refVal].addEventListener("scroll", this.handleMainScroll);
    },
    beforeDestroy() {
      this.$bus.$emit("mainScroll");
      this.$bus.$off("setMainScroll", this.handleSetMainScroll);
      this.$refs[refVal].removeEventListener("scroll", this.handleMainScroll);
    },
    methods: {
      handleSetMainScroll(toTop) {
        this.$refs[refVal].scrollTop = toTop;
      },
      handleMainScroll() {
        this.$bus.$emit("mainScroll", this.$refs[refVal]);
      }
    }
  }
}