import Vue from 'vue'
import App from './App'

import moment from 'moment'

import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'

import 'font-awesome/css/font-awesome.css'
import './config/bootstrap'

import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
}),

Vue.filter('formatDate', function (value) {
  if (value === null) { return null }
  return new Date(value).toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
})

Vue.use(require('vue-moment'))

new Vue({
    store,
    router,
    VueModal,
    components: {
      'Modal': VueModal
    },
    render: h => h(App)
  }).$mount('#app')