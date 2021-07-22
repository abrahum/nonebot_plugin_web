from typing import Any, Dict, Optional

from nonebot import get_driver
from nonebot.log import logger
from nonebot.adapters import Bot
from nonebot.typing import T_State
from nonebot.drivers import Driver
from nonebot.message import event_preprocessor
from nonebot.adapters.cqhttp.event import Event

from .sender import re_sio_sender, se_sio_sender
from .fastapi import register_route
from .webSio import socket_app

driver: Driver = get_driver()


def init():
    register_route(driver, socket_app)
    host = str(driver.config.host)
    port = driver.config.port
    if host in ["0.0.0.0", "127.0.0.1"]:
        host = "localhost"
    logger.opt(colors=True).info(
        f"NonebotWeb will be running at:<b><u>http://{host}:{port}/web/</u></b>")


@Bot.on_called_api
async def handle_sendmsg_call(bot: Bot, exception: Optional[Exception], api: str, data: Dict[str, Any], result: Any):
    data["self_id"] = int(bot.self_id)
    if api in ["send_msg", "send_private_msg", "send_group_msg"]:
        await se_sio_sender(data.copy(), api, bot)


@event_preprocessor
async def handle_receive_msg(bot: Bot, event: Event, state: T_State):
    if event.post_type == "message":
        await re_sio_sender(event.__dict__.copy(), bot=bot, type="event")

init()
