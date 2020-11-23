const state = {
  show: false,
  x: 0,
  y: 0,
  sourceId: null
};
const getters = {};
const mutations = {
  showNavContextMenu(state, { x, y, sourceId }) {
    state.show = true;
    state.x = x;
    state.y = y;
    state.sourceId = sourceId;
  },
  hideNavContextMenu(state) {
    state.show = false;
    state.sourceId = null;
  }
};
const actions = {
  showNavContextMenu({ commit }, payload) {
    commit("showNavContextMenu", payload);
  },
  hideNavContextMenu({ commit }) {
    commit("hideNavContextMenu");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
