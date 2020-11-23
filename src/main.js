import Vue from "vue";

import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import lineClamp from "vue-line-clamp";

import store from "./store";

import router from "./router";
import axios from "axios";

//temp
axios.defaults.baseURL = "http://localhost";
axios.defaults.headers.common["Authorization"] = "Bearer 123123";
Vue.config.productionTip = false;
Vue.use(lineClamp);
Vue.use(VueRouter);

Vue.prototype.$vueEventBus = new Vue();

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
