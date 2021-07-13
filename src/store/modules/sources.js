import sourcesApi from "@/api/sources";
import { Source, SourceWithMeta } from "@/models";
import Vue from "vue";

const state = {
  sources: [],
  tags: [],
  selectedTags: [],
  searching: false,
  search_results: []
};
const getters = {
  getById: (state) => (id) => {
    return state.sources.find(s => s.id === id)
  },
  tags: state => {
    return [...new Set(state.tags.concat(state.selectedTags))]
  }
};
const mutations = {
  saveTags(state, payload) {
    state.tags = payload;
  },

  clearStoredTags(state) {
    state.selectedTags = [];
    state.tags = [];
  },

  newTag(state, tag) {
    state.tags.push(tag);
  },

  setSelectedTags(state, tags) {
    state.selectedTags = tags
  },

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
    let source = SourceWithMeta.fromPb((await sourcesApi.getById(sourceId)).getSource());
    commit("replaceSource", source)
  },

  async searchTags({commit}, query) {
    let tags = await sourcesApi.searchTags(query, 20);
    commit("saveTags", tags.getTagsList())
  },

  async setSourceTags({dispatch, state}, sourceId) {
    await sourcesApi.setTags(sourceId, state.selectedTags);
    await dispatch("loadSource", sourceId)
  },

  newTag({commit}, tag) {
    commit("newTag", tag)
  },

  selectTags({commit}, tags) {
    commit("setSelectedTags", tags)
  },

  clearStoredTags( {commit} ) {
    commit("clearStoredTags")
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
