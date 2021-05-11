import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'font-awesome/css/font-awesome.css'
import VDistpicker from 'v-distpicker'
import BaiduMap from 'vue-baidu-map'
import echarts from 'echarts'

import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";

Vue.config.productionTip = false
//插件形式使用请求
Vue.prototype.postRequest = postRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.component('v-distpicker',VDistpicker)
Vue.use(BaiduMap,{ak:'n7EkmUKxkaSqEljEgKO2HSXvMF6Hi5Lf'})

Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem('tokenStr')) {
        next();
    }else{
        if(to.path == '/'){
            next();
        }else{
            next('/?redirect=' + to.path);
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
