<template>
  <div class="home-container" ref="container" @wheel="handleWheel">
    <ul
      class="carousel-container"
      :style="{ marginTop }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in banners" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>

    <div v-show="index >= 1" class="icon-up icon" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < banners.length - 1"
      class="icon-down icon"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>

    <ul class="indicator">
      <li
        :class="{ active: i === index }"
        v-for="(item, i) in banners"
        :key="item.id"
        @click="switchTo(i)"
      ></li>
    </ul>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import { getBanners } from "@/api/banner";
import CarouselItem from "./Carouselitem.vue";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
export default {
  components: {
    CarouselItem,
    Icon,
    Loading,
  },
  data() {
    return {
      banners: [],
      index: 0, // 当前显示的是第几张图片
      containerHeight: 0, //整个容器的高度
      switching: false, //切换中
      isLoading: true,
    };
  },
  async created() {
    this.banners = await getBanners();
    this.isLoading = false;
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
  },
  methods: {
    // 切换轮播图
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      if (e.deltaY > 5 && this.index < this.banners.length - 1) {
        // 向下滚动
        this.switching = true;
        this.index++;
      } else if (e.deltaY < -5 && this.index > 0) {
        // 向上滚动
        this.switching = true;
        this.index--;
      }
    },
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden; //用于触发bfc

  // 测试代码
  // width: 60%;
  // height: 40%;
  // overflow: visible;
  // border: 2px solid #008c8c;
  // margin: 100px auto;

  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }

  .icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: @gray;
    font-size: 30px;
    cursor: pointer;
    @gap: 25px;
    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
    @jump: 5px;
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%, -@jump);
      }
      50% {
        transform: translate(-50%, @jump);
      }
      100% {
        transform: translate(-50%, -@jump);
      }
    }
  }

  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;
    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>