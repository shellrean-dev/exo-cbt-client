import $axios from '@/services/api.js'

const state = () => ({
    pesertas: [],
    peserta_login: [],
    peserta: {
        no_ujian: '',
        nama: '',
        password: '',
        jurusan_id: '',
        sesi: 1,
        agama_id: '',
        status: 1
    },
    page: 1,
    login_page: 1,
    uploadPercentage: 0
})

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.pesertas = payload
    },
    ASSIGN_PESERTA_LOGIN(state, payload) {
        state.peserta_login = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_LOGIN_PESERTA_PAGE(state, payload) {
        state.login_page = payload
    },
    ASSIGN_FORM(state, payload) {
        state.peserta = {
            no_ujian: payload.no_ujian,
            nama: payload.nama,
            password: payload.password,
            jurusan_id: payload.jurusan_id,
            sesi: payload.sesi,
            agama_id: payload.agama_id,
            status: payload.status,
            block_reason: payload.block_reason
        }
    },
    CLEAR_FORM(state) {
        state.peserta = {
            no_ujian : '',
            nama: '',
            password: '',
            jurusan_id: '',
            sesi: '',
            agama_id: ''
        }
    },
    UPLOAD_PROGRESS_BAR(state, payload) {
        state.uploadPercentage = payload
    }
}

const actions = {
    getPesertas({ commit, state }, payload) {
        let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
        commit('SET_LOADING', true, { root: true })
        
        return new Promise(async ( resolve, reject ) => {
            try {
                let network = await $axios.get(`pesertas?page=${state.page}&perPage=${perPage}&q=${search}`)

                commit('ASSIGN_DATA', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch(error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    submitPeserta({ commit, state }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post(`pesertas`, state.peserta)

                commit('CLEAR_FORM')
                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch(error) {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    getPesertaById({ commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`pesertas/${payload}`)

                commit('ASSIGN_FORM', network.data.data)
                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                console.log(error)
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    updatePeserta({ commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.put(`pesertas/${payload}`, state.peserta)

                commit('CLEAR_FORM')
                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch(error) {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    removePeserta({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.delete(`pesertas/${payload}`)

                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch(error) {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    uploadPeserta({ state, commit }, payload) {
        commit('SET_LOADING',true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post(`pesertas/upload`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: function( progressEvent ) {
                        commit('UPLOAD_PROGRESS_BAR',parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 )))
                    }.bind(this)
                })
                commit('UPLOAD_PROGRESS_BAR', 0);
                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('UPLOAD_PROGRESS_BAR', 0);
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    getPesertasLogin({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload : ''
        commit('SET_LOADING',true, { root: true })

        return new Promise(( resolve, reject ) => {
            $axios.get(`pesertas/login?page=${state.login_page}&q=${search}`)
            .then((response) => {
                commit('ASSIGN_PESERTA_LOGIN', response.data.data)
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((error) => {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            })
        })
    },
    resetLoginPeserta({ commit }, payload) {
        commit('SET_LOADING',true, { root: true })

        return new Promise(( resolve, reject ) => {
            $axios.delete(`pesertas/${payload}/login`)
            .then((response) => {
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((error) => {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            })
        })
    },
    multiResetLoginPeserta({ commit }, payload) {
        commit('SET_LOADING',true, { root: true })

        return new Promise(( resolve, reject ) => {
            $axios.get(`pesertas/multi-reset-login?q=${payload}`)
            .then((response) => {
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((error) => {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            })
        })
    },
    removePesertaMultiple({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })

        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post('pesertas/delete-multiple', payload) 

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