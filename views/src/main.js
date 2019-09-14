import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import { setupComponents } from './config/setup-components';

setupComponents(Vue);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
