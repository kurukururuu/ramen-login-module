import Vue from 'vue'
import App from './App.vue'

import LoginComponent from '../src';
Vue.use(LoginComponent)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
