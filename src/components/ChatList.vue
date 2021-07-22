<template>
  <ul class="message-item">
    <li
      v-for="(item, index) in concats"
      :key="index"
      @click="switchChat(item[0])"
      :class="['message-list', { 'message-active': item[1].active }]"
    >
      <div class="message-left">
        <el-badge
          class="item"
          :max="99"
          :value="item[1].newMessageCount"
          :hidden="item[1].hadNewMessage ? !item[1].hadNewMessage : true"
        >
          <img class="message-avatar" :src="avatar(item[1].type, item[0])" />
        </el-badge>
      </div>

      <div class="message-right">
        <div class="message-header">
          <div class="message-title">
            {{ item[1].chatName }}
          </div>
          <div class="message-time">
            {{ formatTime(item[1]) }}
          </div>
        </div>
        <div class="message-content" v-html="newMessage(item[1])"></div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Chat } from "../assets/utils";

@Component({ name: "ChatList" })
export default class ChatList extends Vue {
  // get chats from Vuex
  public get concats() {
    return this.$store.state.chats;
  }
  private avatar(type: string, id: number) {
    if (id === 0) {
      return "https://v2.nonebot.dev/logo.png"
    }
    if (type === "friend") {
      return "http://q1.qlogo.cn/g?b=qq&nk=" + id.toString() + "&s=640";
    } else {
      return "http://p.qlogo.cn/gh/" + id + "/" + id + "/0";
    }
  }
  // get new message of chat
  private newMessage(item: Chat) {
    if (item.messages[item.messages.length - 1]) {
      return item.messages[item.messages.length - 1].raw_message;
    }
    return "";
  }

  private switchChat(index: number) {
    this.$store.commit("switchChat", index);
    this.$forceUpdate();
    super.$gotoBottom;
  }

  private formatTime(item: Chat) {
    let time: number;
    if (item.messages[0]) {
      time = item.messages[0].time;
    } else {
      return "-:-";
    }
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
.message-active {
  background: rgba(255, 255, 255, 0.4);
}
.message-item {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding-left: 0px;
  margin: 0px;

  .message-list {
    display: flex;
    padding: 10px 15px;
    width: 100%;
    height: 62px;
    font-size: 12px;
    box-sizing: border-box;
    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
    .message-left {
      margin-right: 10px;
      font-size: 0;
      .message-avatar {
        width: 40px;
        height: 40px;
      }
      .message-group {
        border: 1px solid #dedede;
        box-sizing: border-box;
      }
    }
    .message-right {
      flex: 1;
      overflow: hidden;
      .message-header {
        display: flex;
        justify-content: space-between;
        .message-title {
          width: 100%;
          font-size: 14px;
          overflow: hidden;
          height: 19px;
        }
        .message-time {
          color: #aaaaaa;
        }
      }
      .message-content {
        margin-top: 4px;
        color: #999999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>