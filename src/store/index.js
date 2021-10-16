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
import grup from './grup'
import feature from './feature'
import channel from './channel'
import banksoal_adaptif from './banksoal_adaptif'
import penilaian from "./penilaian";

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
    setting,
    grup,
    feature,
    channel,
    penilaian,
    banksoal_adaptif,
  },
  state: {
    errors: [],
    isLoading: false,
    loadPage: false,
    token: localStorage.getItem('token'),
    baseURL: '',
      comingsoon: false
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
    _start_loading_page(state) {
      state.loadPage = true
    },
    _stop_loading_page(state) {
      state.loadPage = false
    },
    _start_loading(state) {
      state.isLoading = true
    },
    _stop_loading(state) {
      state.isLoading = false
    },
      _set_comming(state) {
        state.comingsoon = state
      },
    SET_BASEURL(state, payload) {
      state.baseURL = payload
    }
  }
})
