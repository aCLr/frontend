import sourcesApi from "@/api/sources";
import { Source, SourceWithMeta } from "@/models";
import Vue from "vue";

const state = {
  sources: [],
  tags: [],
  selectedTags: [],
  searching: false,
  searchResults: [],
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
    state.searchResults = payload;
    state.searching = false;
  }
};
const actions = {
  async loadSources({ commit }) {
    let response = (await sourcesApi.loadSources()).getSourcesList().map(s => new SourceWithMeta(s));
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
    commit("finishSearch", response.getSourcesList().map(s => new Source(s)));
  },

  async subscribe({ dispatch }, sourceId) {
    await sourcesApi.subscribe(sourceId);
    dispatch("loadSources");
    dispatch("records/loadRecords", {}, { root: true });
  },

  async loadSource({ commit }, sourceId) {
    let sourceResponse = await sourcesApi.getById(sourceId);
    let source = new SourceWithMeta(sourceResponse.getSource());
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
