import $axios from '@/services/api.js'

const state = () => ({
  backups: []
})

const mutations = {
  _assign_data_backups(state, payload) {
    state.backups = payload
  }
}

const actions = {
  getBackups,
  generateBackup,
  uploadBackup,
  getProxyDownload
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

function getBackups({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await $axios.get("system/backup-index")
      commit('_assign_data_backups', response.data.data)
      resolve(response.data.secret_key)
    } catch (e) {
      reject(e)
    }
  })
}

function generateBackup({ }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await $axios.get("system/backup")
      resolve(response.data)
    } catch (e) {
      reject(e)
    }
  })
}

function uploadBackup({ commit }, payload) {
  commit('SET_LOADING',true, { root: true })
  return new Promise(async (resolve, reject) => {
      try {
          let network = await $axios.post(`system/restore`, payload, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: function( progressEvent ) {
                
              }.bind(this)
          })
          resolve(network.data)
      } catch (error) {
          reject(error.response.data)
      } finally {
        commit('SET_LOADING',false, { root: true })
      }
  })
}

function getProxyDownload({ commit }, backupId) {
  commit('SET_LOADING',true, { root: true })
  return new Promise(async (resolve, reject) => {
      try {
          let network = await $axios.get(`system/backup-download/${backupId}/proxy`)
          resolve(network.data)
      } catch (error) {
          reject(error.response.data)
      } finally {
        commit('SET_LOADING',false, { root: true })
      }
  })
}