import $axios from '@/services/api.js'

const state = () => ({
    banksoals: [],
    allBanksoals: [],
    banksoal: '',
    analys: [],
	page: 1
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.banksoals = payload
    },
    ASSIGN_ALL_DATA(state, payload){ 
        state.allBanksoals = payload
    },
	SET_PAGE(state, payload) {
        state.page = payload
    },
    ASSIGN_FORM(state, payload) {
        state.banksoal = payload
    },
    ASSIGN_DATA_ANALYS(state, payload) {
        state.analys = payload
    }
}

const actions = {
	getBanksoals({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search : ''
        let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
        commit('SET_LOADING', true, { root: true })
		
        return new Promise(async ( resolve, reject ) =>  {
            try {
                let network = await $axios.get(`banksoals?page=${state.page}&q=${search}&perPage=${perPage}`)
				
                commit('ASSIGN_DATA', network.data.data)
                commit('SET_LOADING', false, { root: true })
				resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
		}) 
    },
    getAllBanksoals({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload : ''
		return new Promise(async ( resolve, reject ) =>  {
            try {
                let network = await $axios.get(`banksoals/all`)

				commit('ASSIGN_ALL_DATA', network.data.data)
				resolve(network.data)
            } catch (error) {
                reject(error.response.data)
            }
		}) 
    },
    getBanksoalById({ commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        
        return new Promise(async ( resolve, reject ) => {
            try {
                let network = await $axios.get(`banksoals/${payload}`)

                commit('ASSIGN_FORM', network.data.data)
                commit('SET_LOADING', false, { root: true })
                resolve(network.data.data)
            } catch (error) {
                reject(error.response.data)
            }
        })
    },
	addBanksoal({ commit }, payload) {
        commit('SET_LOADING',true, { root: true })
        
        return new Promise(async (resolve, reject) => {
            try{
                let network = await $axios.post(`banksoals`, payload)

                commit('CLEAR_ERRORS', '', { root: true })
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
    updateBanksoal({ commit, dispatch }, payload) {
        commit('SET_LOADING',true, { root: true })
        
        return new Promise(async (resolve, reject) => {
            try{
                let network = await $axios.put(`banksoals/${payload.id}`, payload.data)

                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    removeBanksoal({ commit }, payload) {
        commit('SET_LOADING',true, { root: true })
        
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.delete(`banksoals/${payload}`)

                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    addSoalBanksoal({ commit }, payload) {
        commit('SET_LOADING',true, { root: true })
        
        return new Promise((resolve, reject) => {
            $axios.post(`soals`, payload) 
            .then((response) => {
                commit('SET_LOADING', false, { root: true})
                resolve(response.data)
            })
            .catch((error) => {
                commit('SET_LOADING', false, { root: true })
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                reject(error.response.data)
            })
        })
    },
    addPasteSoalBanksoal({ commit, state }, payload) {
        commit('SET_LOADING', true, { root: true })
        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post('soals/paste', payload)

                commit('SET_LOADING', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('SET_LOADING', false, { root: true })
                reject(error.response.data)
            }
        })
    },
    updateSoalBanksoal({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING',true, { root: true })
            $axios.post(`soals/${payload.id}/edit`, payload.data) 
            .then((response) => {
                commit('CLEAR_ERRORS','', { root: true })
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            })
        })
    },
    getAllSoalAnalys({ commit, state }, payload) {
        commit('SET_LOADING',true, { root: true })
        return new Promise(( resolve, reject ) =>  {
            $axios.get(`banksoals/${payload}/analys`)
            .then((response) => {
                commit('ASSIGN_DATA_ANALYS', response.data.data)
                commit('SET_LOADING',false, { root: true })
                resolve(response.data)
            })
            .catch((err) => {
                commit('SET_LOADING',false, { root: true })
                reject(err.response.data)
            })
        })  
    }
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}