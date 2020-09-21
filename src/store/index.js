import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import user from './user'
import jurusan from './jurusan'
import peserta from './peserta'
import agama from './agama'
import matpel from './matpel'
import banksoal from './banksoal'
import soal from './soal'
import filemedia from './filemedia'
import ujian from './ujian'
import event from './event'
import setting from './setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    jurusan,
    peserta,
    agama,
    matpel,
    banksoal,
    soal,
    filemedia,
    ujian,
    event,
    setting
  },
  state: {
    errors: [],
    isLoading: false,
    loadPage: false,
    token: localStorage.getItem('token'),
    baseURL: ''
  },
  getters: {
    isAuth: state => {
      return state.token != "null" && state.token != null
    },
    isLoading: state => {
      return state.isLoading
    },
    baseURL: state => {
      return state.baseURL
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_ERRORS(state, payload) {
      state.errors = payload
    },
    CLEAR_ERRORS(state) {
      state.errors = []
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload
    },
    LOADING_PAGE(state, payload) {
      state.loadPage = payload
    },
    SET_BASEURL(state, payload) {
      state.baseURL = payload
    }
  }
})
