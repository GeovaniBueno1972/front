import Vue from 'vue'
import App from './App'

import router from './config/router'

new Vue({
    //store,
    router,
    render: h => h(App)
  }).$mount('#app')