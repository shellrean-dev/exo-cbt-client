import $axios from '@/services/api.js'

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
    }
}

const actions = {
	getMatpels({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
        commit('SET_LOADING', true, { root: true })
		
        return new Promise(async ( resolve, reject ) =>  {
			try {
                let network = await $axios.get(`/matpels?page=${state.page}&q=${search}&perPage=${perPage}`)

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
                let network = await $axios.get(`/matpels/all`)

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
                let network = await $axios.post(`/matpels`, state.matpel)

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
                let network = await $axios.get(`/matpels/${payload}`)

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
                let network = await $axios.put(`/matpels/${payload}`, state.matpel)

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
                let network = await $axios.delete(`/matpels/${payload}`)

                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING',false, { root: true })
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