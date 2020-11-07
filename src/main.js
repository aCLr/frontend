import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import lineClamp from "vue-line-clamp";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(lineClamp);
Vue.prototype.$vueEventBus = new Vue();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
