<template>
  <div>
    <h1>Empty组件</h1>
    <div class="box">
      <Empty />
    </div>
  </div>
</template>

<script>
import Empty from "./components/Empty";
export default {
  components: {
    Empty,
  },
};
</script>

<style>
.box {
  width: 300px;
  height: 300px;
  border: 1px solid;
  position: relative;
}
</style>