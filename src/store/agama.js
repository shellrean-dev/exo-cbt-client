import $axios from '@/services/api.js'

const state = () => ({
    agamas: []
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.agamas = payload
    }
}

const actions = {
    getAgamas({ commit }) {
        return new Promise(async ( resolve, reject) => {
            try {
                let network = await $axios.get(`agamas`)

                commit('ASSIGN_DATA', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}