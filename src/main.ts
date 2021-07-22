import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import GotoBottom from './plugins/gotobottom'
Vue.use(GotoBottom);

import io from "./plugins/socketio";
io(store);

import "element-ui/lib/theme-chalk/index.css"
import ElementUI from 'element-ui'
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
