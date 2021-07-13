import usersApi from "@/api/users";
import foldersApi from "@/api/sources";
import { Folder } from "@/models";

const state = {
    folders: [],
    loaded: false,
};
const getters = {
    getById: (state) => (id) => {
        return state.folders.find(s => s.id === id)
    }
};

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

    async createFolder({dispatch}, folderName) {
        await usersApi.createFolder(folderName);
        await dispatch("loadFolders")
    },

    async setFolder({ dispatch }, {sourceId, folderId}) {
        await foldersApi.setFolder(sourceId, folderId);
        await dispatch("sources/loadSource", sourceId, {root: true})
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
