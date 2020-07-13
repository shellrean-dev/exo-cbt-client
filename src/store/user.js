import $axios from '@/services/api.js'

const state = () => ({
    users: [],
    authenticated: []
})

const mutations = {
    ASSIGN_USER(state, payload) {
        state.users = payload
    },
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    }
}

const actions = {
    getUserLists({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`/user-lists`)

                commit('ASSIGN_USER', network.data.data)
                resolve(network.data)
            } catch (error) {
                reject(error.response.data)
            }
        })
    },
    getUserLogin({ commit }) {
        commit('LOADING_PAGE',true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let netowrk = await $axios.get(`user-authenticated`)

                commit('ASSIGN_USER_AUTH', netowrk.data.data)
                commit('LOADING_PAGE', false, { root: true })
                resolve(netowrk.data)
            } catch (error) {
                commit('LOADING_PAGE', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    changeUserPassword({ commit }, payload) {
        commit('LOADING_PAGE', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post('user/change-password', payload)

                commit('LOADING_PAGE', false, { root: true })
                resolve(network.data)
            } catch(error) {
                commit('LOADING_PAGE', false, { root: true })
                reject(error.response.data)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}