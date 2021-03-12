import $axios from '@/services/api.js'

const state = () => ({
	directories: [],
	contentFilemedia: [],
	page: 1,
	dir_page: 1
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
    },
    SET_PAGE_DIR(state, payload) {
    	state.dir_page = payload
    }
}

const actions = {
	getDirectories({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(( resolve, reject) => {
			$axios.get(`directory?page=${state.dir_page}`)
			.then((response) => {
				commit('ASSIGN_DIRECTORY_DATA',response.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			})
		})
	},
	getDirectory({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			$axios.get(`directory/banksoal/`, payload)
			.then((response) => {
				commit('ASSIGN_DIRECTORY_DATA',response.data)
				resolve(response.data)
			})
			.catch((error) => {
				reject(error.response.data)
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
				reject(error.response.data)
			})
		})
	},
	getContentFilemedia({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.get(`directory/banksoal/${payload}?page=${state.page}`)
			.then((response) => {
				commit('ASSIGN_CONTENT_DIRECTORY', response.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			})
		})
	},
	addFilemedia({ commit, state }, payload) {
		return new Promise ((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`directory/filemedia`, payload) 
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			})
		})
	},
	uploadFileAudio({ commit, state }, payload) {
		return new Promise(( resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`upload/file-audio`,payload,{ headers: { 'Content-Type': 'multipart/form-data'} })
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			})
		})
	},
	removeFilemedia({ commit, state }, payload) {
		return new Promise ((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.delete(`directory/filemedia/${payload}`) 
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
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