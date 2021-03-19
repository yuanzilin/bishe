import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'

import iView from 'iview'; // 导入组件库
import 'iview/dist/styles/iview.css'; // 导入样式
Vue.use(iView);

Vue.prototype.$axios=axios;
axios.defaults.baseURL = 'http://127.0.0.1:8000';
Vue.prototype.$server = 'http://127.0.0.1:8000'
Vue.config.productionTip = false

Vue.use(ElementUI)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
