import $axios from '@/services/api.js'
import axios from 'axios'

const state = () => ({
    set_sekolah: {},
    set_airlock: {},
    set_ujian: {},
    auth: {}
})

const mutations = {
    ASSIGN_SETTING_SEKOLAH(state, payload) {
        state.set_sekolah = payload
    },
    ASSIGN_SETTING_AIRLOCK(state, payload) {
        state.set_airlock = {
            name: 'airlock',
            value: {
                isactive: payload.value.isactive,
                client_id: payload.value.client_id,
                client_secret: payload.value.client_secret,
                server_url: payload.value.server_url,
                token_url: payload.value.token_url,
                user_url: payload.value.user_url,
                consumer_url: payload.value.consumer_url
            },
            type: 'auth'
        }
    },
    ASSIGN_SETTING_UJIAN(state, payload) {
        state.set_ujian = {
            name: 'ujian',
            value: {
                reset: payload.value.reset,
                text_welcome: payload.value.text_welcome,
                text_finish: payload.value.text_finish
            },
            type: 'general'
        }
    },
    SET_ALLOWED_AUTH(state, payload) {
        state.auth = payload
    }
}

const actions = {
    getConfig({ commit }) {
        return new Promise(async(resolve, reject) => { 
            try {
                let netowrk = await axios.get('/static/config.json', {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                commit('SET_BASEURL',netowrk.data.URL, { root: true })
                resolve(netowrk.data)
            } catch (error) {
                reject(error.response.data)
            }
        })
    },
    getSettingSekolah({ commit }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get('settings/sekolah')

                commit('ASSIGN_SETTING_SEKOLAH', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.data.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    storeSettingSekolah({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post('settings/sekolah', payload)

                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    changeLogoSekolah({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise( async (resolve, reject) => {
            try {
                let network = await $axios.post('settings/sekolah/logo', payload)

                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    getSettingAirlock({ commit }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async(resolve, reject) => {
            try {
                let network = await $axios.get(`settings?setting=airlock`)
                
                commit('ASSIGN_SETTING_AIRLOCK', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    setSettingAirlock({ commit, state }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async(resolve, reject) => {
            try {
                let network = await $axios.post('settings', state.set_airlock)

                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    getSettingUjian({ commit }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async(resolve, reject) => {
            try {
                let network = await $axios.get(`settings?setting=ujian`)

                commit('ASSIGN_SETTING_UJIAN', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
     setSettingUjian({ commit, state }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async(resolve, reject) => {
            try {
                let network = await $axios.post('settings', state.set_ujian)

                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    getSetAuth({ commit }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async(resolve, reject) => {
            try {
                let network = await $axios.get('settings/auth')

                commit('SET_ALLOWED_AUTH', network.data.data)
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