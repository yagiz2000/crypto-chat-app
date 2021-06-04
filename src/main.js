import Vue from 'vue'
import App from './App.vue'
import {store} from "./store/store";
Vue.config.productionTip = false
import { SpinnerPlugin } from "bootstrap-vue";
import {router} from "./router/router";
Vue.use(SpinnerPlugin);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
