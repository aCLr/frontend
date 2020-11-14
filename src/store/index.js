import Vue from "vue";
import Vuex from "vuex";
import records from "./modules/records";
import sources from "./modules/sources";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    records,
    sources
  }
});
