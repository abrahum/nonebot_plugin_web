from pathlib import Path
from httpx import AsyncClient
from fastapi import Response
from urllib.parse import unquote
from fastapi.staticfiles import StaticFiles

from nonebot.drivers.fastapi import Driver


async def img_getter(url: str):
    async with AsyncClient() as client:
        print(unquote(url))
        resp = await client.get(url=unquote(url))
        return Response(resp.content)


def register_route(driver: Driver, socketio):
    app = driver.server_app

    static_path = str((Path(__file__).parent / "dist").resolve())

    app.get("/web/img")(img_getter)
    app.mount("/web", StaticFiles(directory=static_path, html=True), name="web")
    app.mount("/web_ws/", socketio, name="socketio")
