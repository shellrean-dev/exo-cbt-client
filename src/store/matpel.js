import $axios from '@/services/api.js'
import { $gateway } from '@/services/api.js'

const state = () => ({
	matpels: [],
    allMatpels: [],
    matpel: {
        kode_mapel: '',
        nama: '',
        jurusan_id: '',
        agama_id: '',
        correctors: ''
    },
    uploadPercentage: 0,
	page: 1,
    from: 1
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.matpels = payload
	},
    ASSIGN_ALL_DATA(state, payload) {
        state.allMatpels = payload
    },
	SET_PAGE(state, payload) {
        state.page = payload
    },
    ASSIGN_FORM(state, payload) {
        state.matpel = {
            kode_mapel: payload.kode_mapel,
            nama: payload.nama,
            agama_id: payload.agama_id,
            correctors: payload.correctors_name,
            jurusan_id: payload.jurusans
        }
    },
    CLEAR_FORM(state) {
        state.matpel = {
            kode_mapel: '',
            nama: '',
            jurusan_id: '',
            agama_id: '',
            correctors: ''
        }
    },
    SET_FROM_DATA(state, payload) {
        state.from = payload
    },
    UPLOAD_PROGRESS_BAR(state, payload) {
        state.uploadPercentage = payload
    }
}

const actions = {
	getMatpels({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
        commit('SET_LOADING', true, { root: true })
		
        return new Promise(async ( resolve, reject ) =>  {
			try {
                let network = await $axios.get(`matpels?page=${state.page}&q=${search}&perPage=${perPage}`)

				commit('ASSIGN_DATA', network.data.data)
                commit('SET_FROM_DATA', network.data.data.from)
                commit('SET_LOADING', false, { root: true })
				resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
		})
	},
    getAllMatpels({ commit, state }, payload) {
        return new Promise(async ( resolve, reject ) =>  {
            try {
                let network = await $gateway.get(`matpels/all`)

                commit('ASSIGN_ALL_DATA', network.data.data)
                resolve(network.data)
            } catch (error) {
                reject(error.network.data)
            }
        }) 
    },
	submitMatpel({ commit, state }) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post(`matpels`, state.matpel)

                commit('CLEAR_FORM')
                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    getMatpelById({ commit }, payload) {
        commit('SET_LOADING',true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.get(`matpels/${payload}`)

                commit('SET_LOADING',false, { root: true })
                commit('ASSIGN_FORM', network.data.data)
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    updateMatpel({ dispatch, commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                const jurusan = (typeof state.matpel.jurusan_id == 'object' && state.matpel.jurusan_id.length == 0) ? 0 : state.matpel.jurusan_id
                const matpel = {
                    agama_id: state.matpel.agama_id,
                    correctors: state.matpel.correctors,
                    jurusan_id: jurusan,
                    kode_mapel: state.matpel.kode_mapel,
                    nama: state.matpel.nama,
                }

                let network = await $axios.put(`matpels/${payload}`, matpel)

                commit('CLEAR_FORM')
                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    removeMatpel({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.delete(`matpels/${payload}`)

                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    uploadMatpel({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post(`matpels/upload`, payload, {
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
    removeMatpelMultiple({ commit }, payload) {
        commit('SET_LOADING', true, { root: true })

        return new Promise(async(resolve, reject) => {
            try {
                let network = await $axios.post('matpels/delete-multiple', payload)

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