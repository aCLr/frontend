import Vue from "vue";
import Vuex from "vuex";
import records from "./modules/records";
import sources from "./modules/sources";
import navContextMenu from "./modules/navContextMenu";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    records,
    sources,
    navContextMenu,
    user
  }
});
