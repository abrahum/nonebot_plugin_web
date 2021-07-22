<template>
  <div id="app">
    <router-view class="views" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
    title: "Test",
  }),
  sockets: {
    connect() {
      console.log("SocketIO connect success.");
      this.$notify({
        title: "SocketIO",
        message: "SocketIO connect success.",
      });
    },
    connect_error(error) {
      console.log("SocketIO connect fail. Failure message:" + error);
      this.$notify.error({
        title: "SocketIO connect failure",
        message: error,
      });
    },
  },
});
</script>

<style scoped>
.views {
  width: 100%;
  margin: 0px;
}
ol,
ul {
  list-style: none;
}
</style>