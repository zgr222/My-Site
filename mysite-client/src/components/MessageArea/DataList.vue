<template>
  <ul class="data-list-container">
    <li v-for="item in list" :key="item.id">
      <Avatar :url="item.avatar" :size="44" />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="time">{{ formatDate(item.createDate) }}</div>
      </div>
    </li>
    <div class="empty">
      <Empty text="我是有底线的~" />
    </div>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar";
import { formatDate } from "@/utils";
import Empty from "@/components/Empty";

export default {
  components: { Avatar, Empty },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-list-container {
  li {
    display: flex;
    border-bottom: 1px solid lighten(@gray, 20%);
    padding: 15px 0;
  }
  .avatar-container {
    margin-right: 15px;
  }
  .nickname {
    color: darken(@success, 10%);
    margin-bottom: 10px;
  }
  .content {
    font-size: 14px;
  }
  .data {
    flex: 1 1 auto;
    position: relative;
  }
  .time {
    position: absolute;
    right: 0;
    top: 4px;
    font-size: 12px;
    color: @gray;
  }
}

.empty {
  position: relative;
  .empty-container {
    top: 70px;
  }
}
</style>