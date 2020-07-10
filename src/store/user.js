import $axios from '@/services/api.js'

const state = () => ({
    authenticated: []
})

const mutations = {
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    }
}

const actions = {
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}