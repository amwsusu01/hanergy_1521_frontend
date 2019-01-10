require('es6-promise').polyfill();
import Vue from 'vue'
import Router from 'vue-router'
import router from './route.config'
// import axios from 'axios'
// import Api from './assets/api/axios'
import globalConfig from './assets/js/global-config'
import App from './App'
//import {sessionId,number_format,_sessionStorage} from './assets/js/util'
import appConfig from './app.config'
// import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
/*import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'*/

//import "element-ui/packages/theme-chalk/src/index.scss";

// Vue.use(VueQuillEditor)
//import '../theme/index.css'
import ElementUI from 'element-ui';

import Echarts from 'echarts';
Vue.prototype.echarts = Echarts;
Vue.use(Echarts);

import "../src/assets/js/echarts-wordcloud"
import "../src/assets/js/echarts-wordcloud.min"

//import md5 from 'js-md5';
//import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', { value: moment });


Vue.use(Router)
Vue.use(globalConfig)

/*Vue.config.debug = true
Vue.config.devtools = false
Vue.config.silent = true*/

import store from './store';

router.afterEach((to,from,next)=> {
    window.scrollTo(0, 0);
    if(document.getElementById('mainContainer')){
        document.documentElement.scrollTop = document.getElementById('mainContainer').scrollTop = 0;
    }
})
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
