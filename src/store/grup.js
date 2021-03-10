import $axios from '@/services/api.js'

/**
 * state for grup
 * @type object
 */
const state = () => ({
    groups: [],
    group: {},
    members: []
})

/**
 * mutations for grup
 * @type object
 */
const mutations = {
    _assign_data_groups(state, payload) {
        state.groups = payload
    },
    _assign_data_group(state, payload) {
        state.group = payload
    },
    _assign_data_members(state, payload) {
        state.members = payload
    }
}

/**
 * actions for grup
 * @type object
 */
const actions = {
    getAllGroup,
    getParentGroup,
    getChildGroup,
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroupById,
    getGroupMemberById,
    createMultipleGroupMember,
    deleteGroupMemberById,
    deleteMultipleGroupMember
}

/**
 * Let's play the game
 * 
 */
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

/**
 * get all group 
 * @param object store
 */
function getAllGroup({ commit }) {
    return new Promise(async (r, v) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.get(`groups?q=all`)

            commit('_assign_data_groups', network.data.data)
            commit('SET_LOADING', false, { root: true })
            r(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
            v(e.response.data)
        }
    })
}

/**
 * get group only parent
 * @param object store
 */
function getParentGroup({ commit }) {
    return new Promise(async (r,v) => {
        try {

        } catch (e) {

        }
    })
}

/**
 * get chilren group by parent
 * @param object store
 * @param int parentId
 */
function getChildGroup({ commit }, parentId) {
    return new Promise(async(r, v) => {
        try {

        } catch (e) {

        }
    })
}

/**
 * create group
 * @param object store
 */
function createGroup({ commit, state }) {
    return new Promise(async(r,v) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.post(`groups`, state.group)

            commit('SET_LOADING', false, { root: true })
        	r(network.data)
        } catch (e) {
            if (e.response.status == 422) {
                commit('SET_ERRORS', e.response.data.errors, { root: true })
            }
            commit('SET_LOADING', false, { root: true })
            v(e.response.data)
        }
    })
}

/**
 * update group
 * @param object store
 */
function updateGroup({ commit, state }) {
    return new Promise(async(v, r) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.put(`groups/${state.group.id}`, state.group)
            
            commit('SET_LOADING', false, { root: true })
            v(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
            r(e.response.data)
        }
    })
}

/**
 * get group by id
 * @param object store
 * @param int groupId
 */
function getGroupById({ commit }, groupId) {
    return new Promise(async(r, v) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.get(`groups/${groupId}`)

            commit('_assign_data_group', network.data.data)
            commit('SET_LOADING', false, { root: true })
            r(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
			v(e.response.data)
        }
    })
}

/**
 * delete group by id
 * @param object store
 * @param int groupId
 */
function deleteGroupById({ commit }, groupId) {
    return new Promise(async(v, r) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.delete(`groups/${groupId}`)

            commit('SET_LOADING', false, { root: true })
            v(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
			r(e.response.data)
        }
    })
}

/**
 * get group's member by groupId
 * @param object store
 * @param int groupId
 */
function getGroupMemberById({ commit }, groupId) {
    return new Promise(async (v, r) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.get(`group_members?q=${groupId}`)

            commit('_assign_data_members', network.data.data)
            commit('SET_LOADING', false, { root: true })
            v(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
            r(e.response.data)
        }
    })
}

/**
 * create multiple group's member
 * @param object store
 * @param object payload
 */
function createMultipleGroupMember({ commit }, payload) {
    return new Promise(async (v, r) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.post(`group_members/multiple`, payload)

            commit('SET_LOADING', false, { root: true })
            v(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
            r(e.response.data)
        }
    })
}

/**
 * delete group's member by id
 * @param object store
 * @param int memberId
 */
function deleteGroupMemberById({ commit }, memberId) {
    return new Promise(async(v, r) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.delete(`group_members/${memberId}`)

            commit('SET_LOADING', false, { root: true })
            v(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
            r(e.response.data)
        }
    })
}

/**
 * delete multiple gorup's member
 * @param object store
 * @param sting ids
 */
function deleteMultipleGroupMember({ commit }, ids) {
    return new Promise(async(v, r) => {
        try {
            commit('SET_LOADING', true, { root: true })
            const network = await $axios.delete(`group_members/multiple?q=${ids}`)

            commit('SET_LOADING', false, { root: true })
            v(network.data)
        } catch (e) {
            commit('SET_LOADING', false, { root: true })
            r(e.response.data)
        }
    })
}