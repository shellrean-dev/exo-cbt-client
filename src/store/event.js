import $axios from '@/services/api.js'

const state = () => ({
	events_all: []
})

const mutations = {
	ASSIGN_DATA_ALL(state, payload) {
		state.events_all = payload
	}
}

const actions = {
	getAllEvents({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload: ''
		return new Promise((resolve, reject) => {
			$axios.get(`/events/all`)
			.then((response) => {
				commit('ASSIGN_DATA_ALL', response.data.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err.response.data)
			})
		})
	},
	addEvent({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post('/events', payload)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				if (error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING', false, { root: true })
				reject(err.response.data)
			})
		})
	},
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}