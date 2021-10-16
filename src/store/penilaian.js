import { $axios } from '@/services/api.js'

const state = () => ({

})

const mutations = {
}

const actions = {
    sendNilaiArgument
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

function getError(error) {
    if (typeof error.response != 'undefined') {
        if (typeof error.response.data != 'undefined') {
            if (typeof error.response.data.code != 'undefined') {
                return error.response.data
            }
            return {message: "unexpected response from server, check your connection"}
        }
        return {message: "unexpected response from server, check your connection"}
    }
    return {message: "unexpected response from server, check your connection"}
}

function sendNilaiArgument({ commit }, payload) {
    return new Promise(async(v,r) => {
        try {
            let network = await $axios.post('ujians/argument/input', payload)
            v(network.data)
        } catch (e) {
            r(getError(e))
        } finally {
            commit('_stop_loading', null, { root: true })
        }
    })
}
