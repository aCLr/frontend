import sourcesApi from "@/api/sources";

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
  loadSources({ commit }) {
    return new Promise((resolve, reject) => {
      sourcesApi
        .loadSources()
        .then(resp => {
          commit("setSources", resp.data);
          resolve(resp);
        })
        .catch(reject);
    });
  },
  async deleteSource({ dispatch }, sourceId) {
    await sourcesApi.deleteSource(sourceId);
    dispatch("loadSources");
    dispatch("records/loadRecords", {}, { root: true });
  },
  async searchSources({ commit }, query) {
    commit("startSearch");
    const response = await sourcesApi.makeSearchQuery(query);
    commit("finishSearch", response.data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
