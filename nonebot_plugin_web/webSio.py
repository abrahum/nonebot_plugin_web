import json
import socketio

from nonebot import get_bots
from nonebot.log import logger
from nonebot.adapters import Bot


sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
socket_app = socketio.ASGIApp(sio, socketio_path="socket")


@sio.event
async def connect(sid, environ):
    logger.info(f"Web Client {sid} Connected.")
    await sio.save_session(sid, {"environ": environ})


@sio.event
async def disconnect(sid):
    logger.info(f"Web Client {sid} Disconnected.")


@sio.on("event")
async def handle_event(sid, data):
    pass


@sio.on("config")
async def handle_config(sid, data):
    if data["type"] == "setBot_id":
        sio.enter_room(sid, data["bot_id"])
        print(sio.manager.rooms)
        return "Enter Room %d" % data["bot_id"]


@sio.on("API")
async def handle_API(sid, data):
    if data["type"] == "get_bots":
        return "bots", get_bots().keys()


@sio.on("BOTAPI")
async def handle_BOTAPI(sid, data):
    bots = get_bots()
    if bots.get(str(data["bot_id"])):
        bot: Bot = bots.get(str(data["bot_id"]))
        rdata = await bot.call_api(**data)
        return rdata
    else:
        logger.warning("Got error BOTAPI request.%s" % data)
        return "BOTAPIR", {"error": "Got error BOTAPI request.%s" % data}
