import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import GAuth from 'vue-google-oauth2'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(GAuth, {
  clientId: process.env.VUE_APP_GOOGLE_AUTH_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
})

// Load hamster account on load if authenticated
if (store.getters.isAuthenticated) {
  store.dispatch('FETCH_ME')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
