import $axios from '@/services/api.js'
import io from 'socket.io-client'

const state = () => ({
	users: [],
	socket: io(process.env.VUE_APP_SOCKET,{autoConnect: false, 'forceNew':true}),
	socket_2: io(process.env.VUE_APP_SOCKET,{autoConnect: false, 'forceNew':true}),
	center: io(process.env.VUE_APP_CENTER_SOCKET,{autoConnect: false})
})

const mutations = {
	ASSIGN_DATA_USERS_CHANNEL(state, payload) {
		state.users = payload
	}
}

const actions = {
	getUserOnChannel({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`channels/${payload}/user`)

				commit('ASSIGN_DATA_USERS_CHANNEL', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	setUserToChannel({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`channels/${payload}/user`)

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