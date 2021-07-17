import { $v3 } from '@/services/api.js'

const state = () => ({
    banksoals: [],
    banksoal: {},
    page: 1
})

const mutations = {
    _assign_data_banksoals(state, payload) {
        state.banksoals = payload
    },
    _assign_data_banksoal(state, payload) {
        state.banksoal = payload
    },
    _set_page(state, payload) {
        state.page = payload
    }
}

const actions = {
    getDataBanksoalAdaptif,
    updateDataBanksoalAdaptif,
    createDataBanksoalAdaptif,
    getSingleDataBanksoalAdaptif,
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

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

function getDataBanksoalAdaptif({ commit, state }, p) {
    let search = typeof p.search != 'undefined' ? p.search : ''
    let perPage = typeof p.perPage != 'undefined' ? p.perPage : ''
    let url = `banksoal-adaptif?page=${state.page}&q=${search}&perPage=${perPage}`

    return new Promise(async (v, r) => {
        try {
            commit('_start_loading', '', { root: true })
            let network = await $v3.get(url)

            commit('_assign_data_banksoals', network.data.data)
            v(network.data)
        } catch (e) {
            r(getError(e))
        } finally {
            commit('_stop_loading', '', { root: true })
        }
    })
}

function getSingleDataBanksoalAdaptif({ commit }, banksoal_id) {
    let url = `banksoal-adaptif/${banksoal_id}`
    return new Promise(async (v, r) => {
        try {
            commit('_start_loading', '', { root: true })
            let network = await $v3.get(url)
            commit('_assign_data_banksoal', network.data.data)
            v(network.data)
        } catch (e) {
            r(getError(e))
        } finally {
            commit('_stop_loading', '', { root: true })
        }
    })
}

function createDataBanksoalAdaptif({ commit, state }) {
    let url = `banksoal-adaptif`

    return new Promise(async (v, r) => {
        try {
            commit('_start_loading', '', { root: true })
            let network = await $v3.post(url, state.banksoal)

            v(network.data)
        } catch (e) {
            r(getError(e))
        } finally {
            commit('_stop_loading', '', { root: true })
        }
    })
}

function updateDataBanksoalAdaptif({ commit, state }) {
    let url = `banksoal-adaptif/${state.banksoal.id}`
    return new Promise(async (v, r) => {
        try {
            commit('_start_loading', '', { root: true })
            let network = await $v3.put(url, state.banksoal)
            v(network.data)
        } catch (e) {
            r(getError(e))
        } finally {
            commit('_stop_loading', '', { root: true })
        }
    })
}