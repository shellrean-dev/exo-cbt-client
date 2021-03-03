import $axios from '@/services/api.js'

const state = () => ({
	events_all: [],
	events: [],
	peserta_sesi: [],
	event_jadwal: {},
	page: 1
})

const mutations = {
	ASSIGN_DATA_ALL(state, payload) {
		state.events_all = payload
	},
	ASSIGN_DATA_PESERTA_SESI(state, payload) {
		state.peserta_sesi = payload
	},
	ASSIGN_DATA(state, payload) {
		state.events = payload
	},
	ASSIGN_DATA_EVENT_JADWAL(status, payload) {
		status.event_jadwal = payload
	},
	SET_PAGE(state, payload) {
		state.page = payload
	}
}

const actions = {
	getEvents({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search : ''
		let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : 10

		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`events?page=${state.page}&perPage=${perPage}&q=${search}`)

				commit('ASSIGN_DATA', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getAllEvents({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload: ''
		return new Promise((resolve, reject) => {
			$axios.get(`events/all`)
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
			$axios.post('events', payload)
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
	getEventById({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`events/${payload}`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	updateEvent({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.put(`events/${payload.id}`, payload.data)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	removeEvent({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.delete(`events/${payload}`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	studentBySesi({ commit }, payload) {
		return new Promise(async(resolve , reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.get(`sesi?s=${payload.s}&j=${payload.j}`)

				commit('SET_LOADING', false, { root: true })
				commit('ASSIGN_DATA_PESERTA_SESI', network.data.data)
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	pushToSesi({ commit }, payload) {
		return new Promise(async(resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.post(`sesi`, payload)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	removeFromSesi({ commit }, payload) {
		return new Promise(async(resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.delete(`sesi?s=${payload.s}&j=${payload.j}&p=${payload.p}`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	importToSesi({ commit }, payload) {
		return new Promise(async(resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.post(`sesi/import?j=${payload.j}`, payload.data)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataEventUjianSesi({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.get(`events/${payload}/ujian`)

				commit('ASSIGN_DATA_EVENT_JADWAL', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	copySesiFromDefault({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.post(`sesi/copy`, {
					jadwal_id: payload
				});

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