<template>
  <div class="messages-box">
    <ul class="messages-ul-box">
      <li
        v-for="(item, index) in getMessages"
        :key="index"
        :class="isSelf(item.user_id)"
      >
        <img
          class="message-avatar"
          :src="avatar(item.sender.user_id)"
          :alt="item.sender.nickname ? item.sender.nickname : item.self_id"
        />
        <p class="message-nickname" v-if="item.nickname === ''">
          {{ formatTime(item.time) }}
        </p>
        <p class="message-nickname" v-else>
          {{ item.sender.nickname + " " + formatTime(item.time) }}
        </p>
        <p class="message-classic" v-html="build_message(item)"></p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import message_array_parser from "../assets/parser";
import { MessageArrayItem, MessageEvent } from "../assets/utils";

@Component({
  name: "Messages",
})
export default class Messages extends Vue {
  public get getChat() {
    return this.$store.getters.activingChat;
  }

  private build_message(item: MessageEvent) {
    if (item.message) {
      let rmsg = "";
      if (item.to_me && item.message_type === "group") {
        rmsg +=
          '<span style="color:red"> @' +
          (this.$store.state.envs.bot_id as string) +
          " </span>";
      }
      rmsg += message_array_parser(item.message as Array<MessageArrayItem>);
      return rmsg;
    } else {
      return this.escape(item.raw_message);
    }
  }

  public get getMessages() {
    console.log(this.$store.getters.activingChat.messages);
    return this.$store.getters.activingChat.messages;
  }

  private avatar(id: number) {
    if (id === 0) {
      return "https://v2.nonebot.dev/logo.png";
    }
    return "http://q1.qlogo.cn/g?b=qq&nk=" + id.toString() + "&s=640";
  }

  private isSelf(id: number) {
    if (this.$store.state.activingChatNumber === 0) {
      if (id === this.$store.state.envs.self_id) {
        return "rightmsg";
      } else {
        return "leftmsg";
      }
    } else {
      if (id === this.$store.state.envs.bot_id) {
        return "rightmsg";
      } else {
        return "leftmsg";
      }
    }
  }

  private escape(s: string) {
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
  }

  private formatTime(time: number) {
    let date = new Date(time);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let hourstr,
      minutestr = "";
    if (hour < 10) {
      hourstr = `0${hour}`;
    } else {
      hourstr = hour.toString();
    }
    if (minute < 10) {
      minutestr = `0${minute}`;
    } else {
      minutestr = minute.toString();
    }
    return hourstr + ":" + minutestr;
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0px;
}
ul {
  padding: 0px;
  list-style: none;
}

.messages-box {
  padding: 0 20px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: rgba(255, 255, 255, 0.8);

  .messages-ul-box {
    margin-bottom: 20px;
    .leftmsg,
    .rightmsg {
      margin-top: 20px;
      width: 100%;
      .message-classic::before {
        content: "";
        position: absolute;
        border-width: 8px;
        border-style: solid;
      }
    }

    .leftmsg {
      .message-avatar {
        float: left;
        margin-right: 10px;
        margin-top: 6px;
      }
      .message-classic {
        background-color: rgba(255, 255, 255, 0.8);
        &::before {
          left: -16px;
          border-color: transparent rgba(255, 255, 255, 0.8) transparent
            transparent;
        }
      }
    }

    .rightmsg {
      text-align: right;
      .message-avatar {
        float: right;
        margin-left: 10px;
        margin-top: 6px;
      }
      .message-classic {
        text-align: left;
        color: #ffffff;
        background-color: rgba(55, 126, 200, 0.8);
        &::before {
          right: -16px;
          border-color: transparent transparent transparent
            rgba(55, 126, 200, 0.8);
        }
      }
    }

    .message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      border: 1px solid #eeeeee;
    }
    .message-nickname {
      color: #777777;
      font-size: 12px;
    }

    .message-classic {
      position: relative;
      max-width: 45%;
      margin-top: 5px;
      display: inline-block;
      padding: 9px 12px;
      font-size: 14px;
      color: #333333;
      border-radius: 5px;
      white-space: pre-line;
      word-break: break-all;
    }
  }
}
</style>