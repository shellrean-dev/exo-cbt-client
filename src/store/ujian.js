import $axios from '@/services/api.js'

const state = () => ({
	ujians: [],
	ujiansExists: [],
	ujianActive: [],
	ujianAll: [],
	pesertas: [],
	page: 1,
	hasilUjian: [],
	essies: [],
	sekolahs: [],
	banksoals: [],
	capaians: [],
	events: [],
	diujikan: {
		jadwal: '',
		sesi: '',
		status_token: '',
		token: ''
	},
	sesis: []
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.ujians = payload
	},
	ASSIGN_DATA_ALL(state, payload) {
		state.ujianAll = payload
	},
	ASSIGN_DATA_ACTIVE(state, payload) {
		state.ujianActive = payload
	},
	ASSIGN_UJIAN_AKTIF(state, payload) {
		state.diujikan = {
			jadwal: payload.ujian_id,
			sesi: payload.kelompok,
			status_token: parseInt(payload.status_token),
			token: payload.token
		}
	},
	ASSIGN_DATA_EVENT(state, payload) {
		state.events = payload
	},
	ASSIGN_SESI_DATA(state, payload) {
		state.sesis = payload
	},
	ASSIGN_DATA_EXISTS(state, payload) {
		state.ujiansExists = payload
	},
	SET_PAGE(state, payload) {
		state.page = payload
	},
	ASSIGN_PESERTA_UJIAN(state, payload) {
		state.pesertas = payload
	},
	ASSIGN_HASIL_UJIAN(state, payload) {
		state.hasilUjian = payload
	},
	ASSIGN_DATA_SEKOLAH(state, payload) {
		state.sekolahs = payload
	},
	ASSIGN_JAWABAN_ESAY(state, payload) {
		state.essies = payload
	},
	ASSIGN_DATA_BANKSOAL(state, payload) {
		state.banksoals = payload
	},
	ASSIGN_CAPAIAN_SISWA(state, payload) {
		state.capaians = payload
	}
}

const actions = {
	getUjians({ commit, state }, payload) {
		let search = typeof payload.search != 'undefined' ? payload.search: ''
		let perPage = typeof payload.perPage != 'undefined' ? payload.perPage: ''
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.get(`/ujians?page=${state.page}&q=${search}&perPage=${perPage}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err.response.data)
			})
		})
	},
	getEvents({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/event-ujian`)
			.then((response) => {
				commit('ASSIGN_DATA_EVENT', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject()
			})
		})
	},
	getUjianActive({ commit, state }, payload) {
		return new Promise(async(resolve, rejet) => {
			try {
				let network = await $axios.get('ujians/active-status')

				commit('ASSIGN_DATA_ACTIVE', network.data.data)
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},
	getUjianDiujian({ commit, state }, payload) {
		return new Promise(async(resolve, rejet) => {
			try {
				let network = await $axios.get('ujians/active')

				commit('ASSIGN_UJIAN_AKTIF', network.data.data)
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},
	getSesi({ commit, state }, payload ){
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`ujians/sesi`)

				commit('ASSIGN_SESI_DATA', network.data.data)
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	},
	saveStatus({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise((resolve, reject) => {
			const data = {
				jadwal: state.diujikan.jadwal,
				kelompok: state.diujikan.sesi
			}
			$axios.post(`ujians/status`, data)
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
	rilisToken({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post('ujians/token-release', { token: state.diujikan.token })
			
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				resolve(error.response.data)
			}
		})
	},
	changeToken({ commit,state}, payload) {
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post('ujians/token-change')
			
				resolve(network.data)
			} catch (error) {
				resolve(error.response.data)
			}
		})
	},
	getAllUjians({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload: ''
		return new Promise((resolve, reject) => {
			$axios.get(`/ujians/all`)
			.then((response) => {
				commit('ASSIGN_DATA_ALL', response.data.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject()
			})
		})
	},
	getSekolahByJadwal({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/result/sekolah/jadwal/${payload}`)
			.then((response) => {
				commit('ASSIGN_DATA_SEKOLAH', response.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getHasilByJadwalAndSekolah({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/ujian/result/sekolah/hasil?page=${state.page}&perPage=${payload.perPage}`,payload)
			.then((response) => {
				commit('ASSIGN_HASIL_UJIAN', response.data.data)
				resolve(response.data)
			})
			.catch((err) => {
				reject(err)
			})
		})
	},
	getBanksoalByJadwalAndSekolah({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/ujian/result/sekolah/banksoal`, payload)
			.then((response) => {
				commit('ASSIGN_DATA_BANKSOAL', response.data)
				resolve(response)
			})
		})
	},
	getCapaianSiswa({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/ujian/resul/capaian-siswa`, payload)
			.then((response) => {
				commit('ASSIGN_CAPAIAN_SISWA', response.data)
				resolve(response)
			})
		})
	},
	getUjianByBanksoal({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/banksoal/${payload}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data)
				resolve(response.data)
			})
		})
	},
	getHasilUjianByFilter({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/hasil/filter`,payload)
			.then((response) => {
				commit('ASSIGN_DATA', response.data)
				resolve(response.data)
			})
		})
	},
	addUjian({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/ujians`, payload) 
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				if (error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			})
		})
	},
	setStatus({ state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/ujians/set-status`, payload)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				reject(error.response.data)
			})
		})
	},
	getPesertas({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })

		return new Promise((resolve, reject) => {
			$axios.get(`ujians/peserta`)
			.then((response) => {
				commit('ASSIGN_PESERTA_UJIAN', response.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(response.data)
			})
			.catch((error) => {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			})
		})
	},
	resetUjianPeserta({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })

		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`ujians/peserta/${payload}/reset`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}	
		})
	},
	selesaiUjianPeserta({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`ujians/peserta/${payload}/close`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		});
	},
	getHasilPeserta({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/hasil/${payload}`)
			.then((response) => {
				commit('ASSIGN_HASIL_UJIAN', response.data)
				resolve(response.data)
			})
		})
	},
	submitNilaiEsay({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/ujian/esay/input`, payload)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
			})
		})
	},
	getExistsEsay({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/esay/exists`, payload)
			.then((response) => {
				commit('ASSIGN_DATA_EXISTS', response.data)
				resolve()
			})
			.catch((err) => {
				reject()
			})
		})
	},
	getExistsByBanksoal({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			$axios.get(`/ujian/esay/koreksi/${payload}?page=${state.page}`)
			.then((response) => {
				commit('ASSIGN_JAWABAN_ESAY', response.data.data)
				resolve()
			})
			.catch((err) => {
				reject()
			})
		})
	},
	setRujukan({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			commit('SET_LOADING', true, { root: true })
			$axios.post(`/ujian/esay/rujukan`, payload)
			.then((response) => {
				commit('SET_LOADING', false, { root: true })
				resolve(response)
			})
			.catch((err) => {
				commit('SET_LOADING', false, { root: true })
				reject(err)
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