module.exports = {
  publicPath: "/web/",
  assetsDir: "static",
  outputDir: "nonebot_plugin_web/dist",
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    proxy: {
      '/web_ws/socket': {
        target: 'http://192.168.0.118:8080',
        ws: true,
        changeOrigin: true,
      },
      '/web': {
        target: 'http://192.168.0.118:8080',
        changeOrigin: true,
      },
    }
  }
}
