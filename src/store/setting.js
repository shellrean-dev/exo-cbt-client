import $axios from '@/services/api.js'

const state = () => ({
    set_sekolah: {},
    set_airlock: {}
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
                user_url: payload.value.user_url
            },
            type: 'auth'
        }
    }
}

const actions = {
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
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}