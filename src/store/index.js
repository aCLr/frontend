import Vue from "vue";
import Vuex from "vuex";
import records from "./modules/records";
import auth from "./modules/auth";
import sources from "./modules/sources";
import navContextMenu from "./modules/navContextMenu";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    records,
    sources,
    navContextMenu,
    auth,
  }
});

export default store;