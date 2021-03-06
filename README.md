<div align="center">

# NoneBot Plugin Web

A Web Monitor For Nonebot2

</div>

<p align="center">
  <a href="https://raw.githubusercontent.com/abrahum/nonebot-plugin-web/master/LICENSE">
    <img src="https://img.shields.io/github/license/abrahum/nonebot_plugin_web.svg" alt="license">
  </a>
  <a href="https://pypi.python.org/pypi/nonebot-plugin-web">
    <img src="https://img.shields.io/pypi/v/nonebot-plugin-web.svg" alt="pypi">
  </a>
  <img src="https://img.shields.io/badge/python-3.8+-blue.svg" alt="python">
</p>

**本插件仅做查看消息使用，不具备任何（未来也不会提供）发送功能，望周知**

## 主要功能

视奸使用中的`Bot`

URL: `http://host:port/web/`

**本插件处于初步开发阶段，前端苦手，勿喷**

## 目前已支持解析的 CQ 码

| 功能  |  cq码   | <center>备注</center>               |
| :---: | :-----: | :---------------------------------- |
| 文本  | `text`  |                                     |
| @某人 |  `at`   | `@Bot` 将会显示为红色               |
| 图片  | `image` | 已支持url与base64，本地文件暂未支持 |

## To-Do

- [x] 新消息置顶
- [ ] cq码解析
- [ ] 图片消息 zoom up
- [ ] 服务端暂存消息

## 更新日志

### 0.1.4

- 增加 `text`、`at`、`image` CQ 码解析支持
- 优化 UI 文本

## 特别鸣谢

[nonebot/nonebot2](https://github.com/nonebot/nonebot2/)：简单好用，扩展性极强的`Bot`框架

[vue-min-chat](https://github.com/WeiLin-Liao/vue-min-chat)：非常感谢这位大大的前端 UI ，救我于水火