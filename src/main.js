import Vue from 'vue'
import App from './App.vue'
import router from './router'

/** 使用 Vant 组件, 一次性完全导入 */
// 1、引入你需要的组件
import Vant from 'vant'
// 2、引入组件样式
// import 'vant/lib/index.css'
// 2、主题定制中使用 引入全部样式
import 'vant/lib/index.less';
// 3、在 vue 中使用 Vant
Vue.use(Vant)


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
