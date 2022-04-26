<template>
  <div>
    <ImageLoader
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      :duration="1500"
      @load="handleLoaded"
    />
  </div>
</template>

<script>
import ImageLoader from "./components/ImageLoader";
export default {
  components: {
    ImageLoader,
  },
  methods: {
    handleLoaded() {
      console.log("ImageLoader组件load事件触发，图片加载完成");
    },
  },
};
</script>

<style>
div {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  /* border: 2px solid; */
}
</style>