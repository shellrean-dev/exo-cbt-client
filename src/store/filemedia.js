import $axios from '@/services/api.js'

const state = () => ({
	directories: [],
	contentFilemedia: [],
	page: 1
})

const mutations = {
	ASSIGN_DIRECTORY_DATA(state, payload) {
		state.directories = payload
	},
	SET_PAGE(state, payload) {
        state.page = payload
    },
    ASSIGN_CONTENT_DIRECTORY(state, payload) {
    	state.contentFilemedia = payload
    }
}

const actions = {
	getDirectories({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			$axios.get(`/directory`)
			.then((response) => {
				commit('ASSIGN_DIRECTORY_DATA',response.data)
				resolve(response.data)
			})
		})
	},
	getDirectory({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			$axios.get(`/directory/banksoal/`, payload)
			.then((response) => {
				commit('ASSIGN_DIRECTORY_DATA',response.data)
				resolve(response.data)
			})
		})
	},
	addDirectory({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			$axios.post(`/directory`, payload)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				if (error.response.status == 422) {
					commit('SET_ERRORS',error.response.status.data, { root: true })
				}
			})
		})
	},
	getContentFilemedia({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.get(`/directory/banksoal/${payload}?page=${state.page}`)
			.then((response) => {
				commit('ASSIGN_CONTENT_DIRECTORY', response.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject()
			})
		})
	},
	addFilemedia({ commit, state }, payload) {
		return new Promise ((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/directory/filemedia`, payload) 
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	uploadFileAudio({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			$axios.post(`/upload/file-audio`,payload,{ headers: { 'Content-Type': 'multipart/form-data'} })
			.then((response) => {
				resolve(response.data)
			})
		})
	},
	removeFilemedia({ commit, state }, payload) {
		return new Promise ((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.delete(`/directory/filemedia/${payload}`) 
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject()
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}