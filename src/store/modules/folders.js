import usersApi from "@/api/users";
import foldersApi from "@/api/folders";
import { Folder } from "@/models";

const state = {
    folders: [],
    loaded: false,
};
const getters = {};

const mutations = {
    setFolders(state, folders) {
        state.folders = folders
    },
    setLoaded(state) {
        state.loaded = true;
    }
};

const actions = {
    async loadFolders({ commit }) {
        commit("setLoaded");
        let response = (await usersApi.getFolders()).getFoldersList().map(Folder.fromPb);
        commit("setFolders", response);
        return response
    },
    async setFolder({ commit }, {sourceId, folderId}) {
        let response = await foldersApi.setFolder(sourceId, folderId);
        this.$store.dispatch("sources/loadSource", sourceId)
        return response
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
