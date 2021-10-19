import Vue from 'vue'
import App from './App'

import 'font-awesome/css/font-awesome.css'

import './config/bootstrap'

import './config/msgs'
import store from './config/store'
import router from './config/router'

new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')