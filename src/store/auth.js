import $axios from '@/services/api.js'

const actions = {
    submit({ commit }, payload) {
        localStorage.setItem('token',null)
        commit('SET_TOKEN',null,{ root: true } )
        commit('SET_LOADING', true, { root: true })

        return new Promise(async (resolve, reject) => {
            try {
                let network = await $axios.post('login', payload)

                if (network.data.status == 'success') {
                    localStorage.setItem('token',network.data.token)
                    commit('SET_TOKEN',network.data.token, { root: true })
                }
                else {
                    commit('SET_ERRORS', { invalid: 'Email/password salah' } , { root: true })
                }
                commit('SET_LOADING',false, { root: true })
                resolve(network.data)
            } catch (error) {
                if (error.response.status == 422) {
                    commit('SET_ERRORS',error.response.data.errors, { root: true})
                }
                commit('SET_LOADING',false, { root: true })
                reject(error.response.data)
            }
        })
    },
    loggedOut({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                commit('LOADING_PAGE', true, { root: true })
                let network = await $axios.get('logout')
                commit('LOADING_PAGE', false, { root: true })
                resolve(network.data)
            } catch (error) {
                commit('LOADING_PAGE', false, { root: true })
                reject(error.response.data)
            }
        })
    }
}

export default {
    namespaced: true,
    actions
}