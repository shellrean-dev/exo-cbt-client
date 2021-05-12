import { $v3 } from '@/services/api.js'

const state = () => ({
    feature_info: {}
})

const mutations = {
    _assign_data
}

function _assign_data(state, payload) {
    state.feature_info = payload
}

const actions = {
    getFeatureInfo({ commit }, name) {
        return new Promise(async ( resolve, reject) => {
            try {
                commit('LOADING_PAGE', true, { root: true })
                let network = await $v3.get(`feature-info?name=${name}`)

                commit('_assign_data', network.data.data)
                commit('LOADING_PAGE', false, { root: true })
                resolve(network.data)
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
    actions,
    mutations
}