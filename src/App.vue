<template>
  <div id="container">
    <h1>{{ initData }}</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      initData: "Vue 开发环境运行成功！12321",
    };
  },
};
</script>