import sourcesApi from "@/api/sources";
import { Source, SourceWithMeta } from "@/models";
import Vue from "vue";

const state = {
  sources: [],
  searching: false,
  search_results: []
};
const getters = {
  getById: (state) => (id) => {
    return state.sources.find(s => s.id === id)
  }
};
const mutations = {
  setSources(state, payload) {
    state.sources = payload;
  },

  replaceSource(state, source) {
    Vue.set(state.sources, state.sources.findIndex(s => s.id === source.id), source)
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
  },

  async loadSource({ commit }, sourceId) {
    let source = SourceWithMeta.fromPb((await sourceId.getById(sourceId)).getSource());
    commit("replaceSource", source)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
