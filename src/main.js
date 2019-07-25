import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import VueAnalytics from 'vue-analytics'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import config from './config'

import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

Amplify.configure(config)
Vue.use(AmplifyPlugin, AmplifyModules)

if (process.env.VUE_APP_GOOGLE_ANALYTICS_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID
  })
}

new Vue({
  render: h => h(App)
}).$mount('#app')
