import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { Chat, MessageEvent } from '../assets/utils'

Vue.use(Vuex)

interface Envs {
  self_id: number,
  access_token: string,
  bot_id: number | undefined,
}

interface RootState {
  envs: Envs
  chats: Map<number, Chat>
  activingChatNumber: number
}

const storeops: StoreOptions<RootState> = {
  state: {
    envs: {
      self_id: -1, // web端视为-1号客户端
      access_token: "",
      bot_id: -1,
    },
    chats: new Map([[0, {
      user_id: 0, // 预留0号作为默认聊天，后续可以做帮助信息窗口
      active: true,
      chatName: "NoneBotWeb",
      avatar: "https://v2.nonebot.dev/logo.png",
      type: "",
      messages: [
        {
          user_id: 0,
          self_id: -1,
          post_type: "",
          message_type: "",
          raw_message: "本项目仅做技术讨论之用。\n本项目不具备任何发送消息功能。\n请在下方输入bot_id开始监听（视奸）",
          time: new Date().getTime(),
          sender: {
            user_id: 0,
            nickname: "NoneBotWeb",
            sex: "Bot",
            age: 0,
          }
        }
      ],
      newMessageCount: 0,
      hadNewMessage: false,
    }],]),
    activingChatNumber: 0,
  },
  getters: {
    activingChat(state): Chat | undefined {
      const chat = state.chats.get(state.activingChatNumber);
      if (chat === undefined) {
        console.log("activingChat get error")
        return chat
      } else {
        return chat
      }
    }
  },
  mutations: {
    delAllChats(state: RootState) {
      const zerochat = state.chats.get(0)
      state.chats.clear();
      state.chats.set(0, zerochat as Chat)
    },
    setBot_id(state: RootState, bot_id) {
      state.envs.bot_id = bot_id
    },
    delChat(state: RootState, id: number) {
      state.chats.delete(id);
    },
    switchChat(state: RootState, index: number) {
      const newaChat = state.chats.get(index);
      (newaChat as Chat).hadNewMessage = false;
      (newaChat as Chat).newMessageCount = 0;
      if (newaChat) {
        newaChat.active = true;
        state.chats.set(index, newaChat);
        const oldaChat = state.chats.get(state.activingChatNumber);
        if (oldaChat) {
          oldaChat.active = false;
          state.chats.set(state.activingChatNumber, oldaChat);
          state.activingChatNumber = index;
        }
      }
    },
    checkChat(state: RootState, payload: any) {
      const newChat: Chat = {
        user_id: payload.id,
        active: false,
        type: payload.sub_type,
        chatName: payload.chatName,
        avatar: "",
        messages: [],
        newMessageCount: 0,
        hadNewMessage: false,
      }
      state.chats.set(payload.id, newChat);
    },
    newMessage(state: RootState, payload: any) {
      const msg: MessageEvent = {
        message_type: payload.sub_type,
        raw_message: payload.raw_message,
        user_id: payload.user_id,
        time: payload.time,
        self_id: payload.self_id,
        post_type: payload.post_type,
        sender: {
          user_id: payload.sender.user_id,
          nickname: payload.sender.nickname,
          sex: payload.sender.sex,
          age: payload.sender.age
        }
      };
      const chats = state.chats;
      const newChat = (chats.get(payload.id) as Chat)
      newChat.messages.push(msg);
      chats.delete(payload.id)
      if (!newChat.active) {
        newChat.hadNewMessage = true;
        newChat.newMessageCount += 1;
      }
      chats.set(payload.id, newChat)
      state.chats = new Map();
      state.chats = chats;
      console.log(state.chats)
    }
  },
  actions: {
    SOCKET_event({ commit, rootState }, payload) {
      if (!rootState.chats.get(payload.id)) {
        commit("checkChat", payload);
      }
      commit("newMessage", payload);
    }
  },
  modules: {}
}

export default new Vuex.Store<RootState>(storeops)
