from time import time

from nonebot.adapters.cqhttp.bot import Bot
from .webSio import sio


async def _sender(data: dict) -> None:
    '''
    接收bot消息，转发至web端
    '''
    await sio.emit("event", data, room=data["self_id"])


async def re_sio_sender(data: dict, bot: Bot, type: str = None) -> None:
    '''
    鉴定是否为需要监听的消息 to do
    '''
    if type == "event":
        msgs = []
        for msg in data["message"]:
            msgs.append(msg.__dict__)
        data["message"] = msgs
        data["sender"] = data["sender"].__dict__
        data["time"] = int(time()*1000)
        if data["message_type"] == "private":
            data["id"] = data["user_id"]
            data["chatName"] = data["sender"]["nickname"]
        else:
            data["id"] = data["group_id"]
            rdata = await bot.get_group_info(group_id=data["group_id"])
            data["chatName"] = rdata["group_name"]
    await _sender(data)


async def se_sio_sender(data: dict, mtype: str, bot: Bot) -> None:
    bot_info = await bot.get_login_info()
    rdata = {
        "post_type": "message",
        "user_id": int(bot.self_id),
        "self_id": int(bot.self_id),
        "time": int(time()*1000),
        "sender": {
            "user_id": int(bot.self_id),
            "nickname": bot_info["nickname"],
            "sex": "Bot",
            "age": -1,
        }
    }

    rmsg = ""
    for msgs in data["message"]:
        rmsg += msgs.__str__()
    rdata["raw_message"] = rmsg

    msgs = []
    for msg in data["message"]:
        if isinstance(msg, str):
            msgs.append(msg)
        else:
            msgs.append(msg.__dict__)
    rdata["message"] = msgs

    if data.get("group_id"):
        rdata["id"] = data["group_id"]
        rdata["sub_type"] = "group"
        group = await bot.get_group_info(group_id=data["group_id"])
        rdata["chatName"] = group["group_name"]
    elif data.get("user_id"):
        rdata["id"] = data["user_id"]
        rdata["sub_type"] = "private"
        sender = await bot.get_stranger_info(user_id=data["user_id"])
        rdata["chatName"] = sender["nickname"]
    await _sender(rdata)
