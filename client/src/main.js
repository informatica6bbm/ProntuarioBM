import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins';
import vuetify from './plugins/vuetify';
import { sync } from 'vuex-router-sync';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTheMask from 'vue-the-mask';
// import PdfJs from 'pdf.js';

// const { VueLoaderPlugin } = require("vue-loader");

Vue.use(VueTheMask);
Vue.use(VueAxios, axios);

sync(store, router)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
