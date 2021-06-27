import sourcesApi from "@/api/sources";
import { Source, SourceWithMeta } from "@/models";

const state = {
  sources: [],
  searching: false,
  search_results: []
};
const getters = {};
const mutations = {
  setSources(state, payload) {
    state.sources = payload;
  },
  startSearch(state) {
    state.searching = true;
  },
  finishSearch(state, payload) {
    state.search_results = payload;
    state.searching = false;
  }
};
const actions = {
  async loadSources({ commit }) {
    let response = (await sourcesApi.loadSources()).getSourcesList().map(SourceWithMeta.fromPb);
    commit("setSources", response);
    return response
  },
  async deleteSource({ dispatch }, sourceId) {
    await sourcesApi.unsubscribe(sourceId);
    dispatch("loadSources");
    dispatch("records/loadRecords", {}, { root: true });
  },
  async searchSources({ commit }, query) {
    commit("startSearch");
    const response = await sourcesApi.search(query);
    commit("finishSearch", response.getSourcesList().map(Source.fromPb));
  },
  async subscribe({ dispatch }, sourceId) {
    await sourcesApi.subscribe(sourceId);
    dispatch("loadSources");
    dispatch("records/loadRecords", {}, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
