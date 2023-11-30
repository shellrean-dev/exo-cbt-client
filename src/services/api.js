import axios from 'axios'
import store from '@/store'
import router from '@/router';

const $axios = axios.create({
    headers: {
        'Accept': 'application/json'
    },
})

const $v3 = axios.create({
    headers: {
        'Accept': 'application/json'
    },
})

const $axios2 = axios.create({
    headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument'
        + '.spreadsheetml.sheet',
    },
    responseType: 'blob',
})

const $gateway = axios.create({
    headers: {
        'Accept': 'application/json'
    },
})

$axios.interceptors.request.use (
    function ( config ) {
        config.headers.Authorization = 'Bearer '+store.state.token;
        config.url = '/api/v1/' + config.url
        return config;
    },
    function ( error ) {
        return Promise.reject( error )
    }
)

$v3.interceptors.request.use (
    function ( config ) {
        config.headers.Authorization = 'Bearer '+store.state.token;
        config.url = '/api/v3/' + config.url
        return config;
    },
    function ( error ) {
        return Promise.reject( error )
    }
)

$axios2.interceptors.request.use (
    function ( config ) {
        config.headers.Authorization = 'Bearer '+store.state.token;
        config.url = '/api/v1/' + config.url
        return config;
    },
    function ( error ) {
        return Promise.reject( error )
    }
)

$gateway.interceptors.request.use (
    function ( config ) {
        config.headers.Authorization = 'Bearer '+store.state.token;
        config.url = '/api/gateway/' + config.url
        return config;
    },
    function ( error ) {
        return Promise.reject( error )
    }
)

$axios.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
      if (error.response.status == 401) {
        new Promise((resolve, reject) => {
            delete localStorage.token
            resolve()
        }).then(() => {
            store.state.token = localStorage.getItem('token')
            router.push({ name: 'login' })
        })
      }
      return Promise.reject(error);
    }
)

$gateway.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
      if (error.response.status == 401) {
        new Promise((resolve, reject) => {
            delete localStorage.token
            resolve()
        }).then(() => {
            store.state.token = localStorage.getItem('token')
            router.push({ name: 'login' })
        })
      }
      return Promise.reject(error);
    }
)

$v3.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
      if (error.response.status == 401) {
        new Promise((resolve, reject) => {
            delete localStorage.token
            resolve()
        }).then(() => {
            store.state.token = localStorage.getItem('token')
            router.push({ name: 'login' })
        })
      }
      return Promise.reject(error);
    }
)
export { $axios2, $axios, $v3, $gateway }
export default $axios