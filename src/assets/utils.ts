import Vue from 'vue'

export default new Vue()

interface Sender {
    user_id: number;
    nickname: string;
    sex: string;
    age: number;
}

// 字符串格式OneBot消息段
interface MessageString {
    message: string;
    user_id: number;
}

// 数组格式消息段
interface MessageArrayItem {
    type: string;
    data: {
        type?: string;
        file?: string;
        text?: string;
        id?: string;
        qq?: string;
        url?: string;
        title?: string;
        lat?: string;
        lon?: string;
        audio?: string;
        nickname?: string;
        content?: string | Array<MessageArrayItem>;
    }
}

// 通讯用Event格式
interface Event {
    time: number;      // 时间戳 onebot
    self_id: number;    // 收到事件的qq号 onebot
    post_type: string;  //事件类型 onebot
}

interface MessageEvent extends Event {
    message_type: string;
    sub_type?: string;
    message?: MessageString | Array<MessageArrayItem>;
    raw_message: string;
    user_id: number;
    sender?: Sender;
}

interface Chat {
    user_id: number;
    active: boolean;  // 是否激活状态
    chatName: string; // 聊天标题
    avatar: string | undefined;   // 头像url
    type: string;     // 聊天类型
    messages: Array<MessageEvent>; // 消息
    newMessageCount: number;
    hadNewMessage: boolean;
}

export {
    Chat,
    Event,
    MessageEvent,
}