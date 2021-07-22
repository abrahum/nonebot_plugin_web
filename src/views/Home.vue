<template>
  <div class="wrapper">
    <el-container>
      <el-aside width="250px">
        <el-header height="40px">
          <i class="el-icon-user-solid icon-message"></i>
          <span class="title">聊天列表</span>
        </el-header>
        <ChatList />
      </el-aside>
      <el-main>
        <el-header height="40px">
          <span class="title">{{ getActivingTitle }}</span>
        </el-header>
        <Messages />
        <Sender />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Messages from "../components/Messages.vue";
import Sender from "../components/Sender.vue";
import ChatList from "../components/ChatList.vue";

@Component({
  name: "Dialogue",
  components: {
    Messages,
    Sender,
    ChatList,
  },
})
export default class Dialogue extends Vue {
  public get getActivingTitle() {
    return this.$store.getters.activingChat.chatName;
  }

  created() {
    super.$socket.connect();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  background-color: #555;
  .el-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 88%;
    margin: 30px auto;
  }
  .el-aside,
  .el-main {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .el-aside {
    background: rgba(235, 233, 232, 0.8);
  }
  .el-main {
    padding: 0;
    margin-left: 20px;
  }
  .el-header {
    position: relative;
    line-height: 40px;
    background: rgb(55, 126, 200);
    overflow: hidden;
    .title,
    .icon-message {
      color: #ffffff;
    }
    .icon-message {
      font-size: 20px;
      vertical-align: middle;
    }
    .title {
      display: inline-block;
      margin-left: 5px;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
}

@media screen and (max-width: 767px) {
  .wrapper {
    .el-container {
      width: 100%;
      margin: 0 auto;
      .el-aside {
        width: 70px !important;
        border-radius: 0;
        .el-header {
          padding: 0 0;
          text-align: center;
          .title {
            display: none;
          }
        }
        .message-item {
          .message-list {
            .message-right {
              display: none;
            }
            .message-left {
              margin-right: 0;
            }
          }
        }
      }
      .el-main {
        margin-left: 0;
        border-radius: 0;
        .message-pabel-box {
          padding: 0 12px;
        }
        .message-styles-box {
          .message-classic {
            max-width: 70%;
          }
        }
      }
    }
    .el-dialog {
      width: 80%;
    }
  }
  .face-warp {
    width: 70%;
  }
}
</style>