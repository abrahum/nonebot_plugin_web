from pathlib import Path
from fastapi.staticfiles import StaticFiles

from nonebot.drivers.fastapi import Driver


def register_route(driver: Driver, socketio):
    app = driver.server_app

    static_path = str((Path(__file__).parent / "dist").resolve())

    app.mount("/web", StaticFiles(directory=static_path, html=True), name="web")
    app.mount("/web_ws/", socketio, name="socketio")
