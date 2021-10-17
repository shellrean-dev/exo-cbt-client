import { $axios } from '@/services/api.js'

const state = () => ({

})

const mutations = {
}

const actions = {
    sendNilaiArgument,
    getLinkExcelJawabanPeserta,
    uploadJawabanPesertaEsay
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
            return error.response.data
        }
        return {message: "unexpected response from server, check your connection"}
    }
    return {message: "unexpected response from server, check your connection"}
}

function sendNilaiArgument({ commit }, payload) {
    return new Promise(async(v,r) => {
        try {
            commit('_start_loading', null, { root: true })
            let network = await $axios.post('ujians/argument/input', payload)
            v(network.data)
        } catch (e) {
            r(getError(e))
        } finally {
            commit('_stop_loading', null, { root: true })
        }
    })
}

function getLinkExcelJawabanPeserta({ commit }, payload) {
    return new Promise(async(resolve, reject) => {
        try {
            commit('_start_loading', null, { root: true })
            let network = await $axios.get(`ujians/esay/${payload.banksoal}/koreksi-offline/link`)
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
        } finally {
            commit('_stop_loading', null, { root: true })
        }
    })
}

function uploadJawabanPesertaEsay({ commit }, payload) {
    return new Promise(async(resolve, reject) => {
        try {
            commit('_start_loading', null, { root: true })
            let network = await $axios.post(`ujians/esay/koreksi-offline/upload`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            resolve(network.data)
        } catch (error) {
            reject(getError(error))
        } finally {
            commit('_stop_loading', null, { root: true })
        }
    })
}
