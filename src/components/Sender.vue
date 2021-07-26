<template>
  <div class="sender">
    <div class="input-tools">
      <i slot="reference" class="el-icon-s-opportunity" title="表情"></i>
    </div>

    <el-input
      type="textarea"
      resize="none"
      :autosize="{ minRows: 3, maxRows: 3 }"
      v-model="textArea"
      v-on:keyup.native="keyUp"
    >
    </el-input>

    <div class="footer-tools">
      <el-button
        size="mini"
        type="primary"
        @click="sendMessage"
        class="send-button"
      >
        发送
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { MessageEvent } from "../assets/utils";
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "Sender" })
export default class Sender extends Vue {
  private textArea = "";

  private buildMessage(): MessageEvent {
    let type: string;
    let activingChat = this.$store.getters.activingChat;
    if (activingChat.type == "private") {
      type = "private";
    } else {
      type = "group";
    }
    let msgEvent: MessageEvent = {
      user_id: activingChat.user_id,
      message_type: type,
      raw_message: this.textArea,
      self_id: this.$store.state.self_id,
      post_type: "message",
      time: 0,
    };
    return msgEvent;
  }

  private sendMessage() {
    // let msg = this.buildMessage();
    // console.log(msg);
    // this.$socket.emit("event", msg);
    const id = Number(this.textArea);
    this.textArea = "";
    if (isNaN(id)) {
      this.$notify.warning("请输入合法的Bot_id");
    } else {
      this.$socket.emit(
        "config",
        {
          type: "setBot_id",
          bot_id: id,
        },
        (data: any) => {
          this.$store.commit("setBot_id", id);
          console.log(data);
          this.$notify.info("已连接到Room：" + id.toString());
        }
      );
    }
  }

  private keyUp(event: any) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }
}
</script>

<style lang="scss">
.sender {
  height: 150px;
  background-color: rgba(255, 255, 255, 0.85);
  border-top: 1px solid #dddddd;
  .input-tools {
    position: relative;
    padding-left: 10px;
    padding-top: 10px;
    .upload-demo {
      display: inline;
    }
    i {
      margin-left: 10px;
      color: rgb(94, 94, 94);
      font-size: 20px;
      cursor: pointer;
    }
  }
  .el-textarea {
    .el-textarea__inner {
      padding: 5px 20px;
      border-radius: 0;
      border: 0;
      background-color: transparent;
    }
  }
  .footer-tools {
    text-align: right;
    .send-button {
      padding: 7px 10px;
      margin-right: 20px;
      background: #377ec8;
    }
  }
}
.face-pabel {
  .face {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
</style>