import $axios from '@/services/api.js'

const state = () => ({
    users: [],
    users_data: [],
    user: {
        name: '',
        email: '',
        password: ''
    },
    uploadPercentage: 0,
    authenticated: [],
    page: 1
})

const mutations = {
    ASSIGN_USER(state, payload) {
        state.users = payload
    },
    ASSIGN_USER_AUTH(state, payload) {
        state.authenticated = payload
    },
    ASSIGN_USERS(state, payload) {
        state.users_data = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    ASSIGN_USER_FORM(state, payload) {
        state.user = {
            name: payload.name,
            email: payload.email
        }
    },
    CLEAR_FORM(state, payload) {
        state.user = {
            name: '',
            email: '',
            password: ''
        }
    },
    UPLOAD_PROGRESS_BAR(state, payload) {
        state.uploadPercentage = payload
    }
}

const actions = {
    getUserLists({ commit }) {
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`user-lists`)

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
    },
    getUsers({ commit, state }, payload) {
        let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''

        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`users?page=${state.page}&q=${search}&perPage=${perPage}`)
                commit('ASSIGN_USERS', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.dta)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    storeUser({ commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post('users', state.user)

                commit('CLEAR_FORM')
                commit('SET_LOADING', false, { root: true })
                resolve(network.dta)
            } catch (error) {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    getUserById({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`users/${payload}`)
                
                commit('ASSIGN_USER_FORM', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.dta)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    updateUser({ commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.put(`users/${payload}`, state.user)
                
                commit('CLEAR_FORM')
                commit('SET_LOADING', false, { root: true })
                resolve(network.dta)
            } catch (error) {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    removeUser({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.delete(`users/${payload}`)
                commit('SET_LOADING', false, { root: true })
                resolve(network.dta)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    uploadUser({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise( async (resolve, reject) => {
            try {
                let network = await $axios.post(`users/upload`, payload)
                commit('UPLOAD_PROGRESS_BAR', 0);
                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('UPLOAD_PROGRESS_BAR', 0);
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    removeUserMultiple({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })

        return new Promise(async(resolve, reject) => {
            try {
                let network = await $axios.post('users/delete-multiple', payload) 

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
    mutations,
    actions
}