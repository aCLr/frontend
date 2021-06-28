import authApi from "@/api/auth";

const tokenKey = "user-token";

const state = {
    token: localStorage.getItem(tokenKey) || '',
};
const getters = {
    isAuthenticated: state => !!state.token,
};


const actions = {
    "register": ({commit}, {login, password}) => {
        return new Promise((resolve, reject) => {
            authApi.register(login, password).then(resp => {
                const user = resp.getUser();
                const token = user.getToken();
                localStorage.setItem(tokenKey, token)
                commit("authSuccess", token);
                resolve(user)
            }).catch(err => {
                reject(err)
            })
        })
    },
    "login": ({commit}, {login, password}) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            authApi.login(login, password).then(resp => {
                const user = resp.getUser()
                const token = user.getToken();
                localStorage.setItem(tokenKey, token)
                commit("authSuccess", token);
                resolve(user)
            }).catch(err => {
                reject(err)
            })
        })
    }
};
const mutations = {
    "authSuccess": (state, token) => {
        state.token = token;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
