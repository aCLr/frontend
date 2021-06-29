import authApi from "@/api/auth";
import router from "@/router";

const tokenKey = "user-token";

const state = {
    token: localStorage.getItem(tokenKey) || '',
};
const getters = {
    isAuthenticated: state => !!state.token,
};


const actions = {
    register({commit}, {login, password}) {
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
    logout({commit}) {
        commit("logout")
    },
    login({commit}, {login, password}) {
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
    authSuccess(state, token) {
        state.token = token;
    },
    logout(state) {
        state.token = "";
        localStorage.removeItem("user-token")
        router.push("/")
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
