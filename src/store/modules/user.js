import Cookies from 'js-cookie'
import firebase from '@/plugins/firebase.js'

export const state = () => ({
  user: null,
  info: null,
  uid: null,
})

export const mutations = {
  setUser(state, payload) {
    if (payload) {
      state.user = payload
    } else {
      state.user = null
    }
  },
  saveUid(state, payload) {
    if (payload) {
      state.uid = payload
    } else {
      state.uid = null
    }
  },
  setInfo(state, payload) {
    if (payload) {
      state.info = payload
    } else {
      state.info = null
    }
  },
}

export const actions = {
  async login({ dispatch, state }, user) {
    console.log('userlogin')
    const token = await firebase.auth().currentUser.getIdToken(true)
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
    }

    Cookies.set('access_token', token) // saving token in cookie for server rendering
    await dispatch('setUser', userInfo)
    await dispatch('saveUid', userInfo.uid)
  },

  async logout({ commit }) {
    await firebase.auth().signOut()

    Cookies.remove('access_token')
    commit('setUser', null)
    commit('saveUid', null)
  },
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
  saveUid({ commit }, payload) {
    commit('saveUid', payload)
  },
  setInfo({ commit }, payload) {
    commit('setInfo', payload)
  },
}

export const getters = {
  user: (state) => {
    return state.user
  },
  info: (state) => {
    return state.info
  },
  uid: (state) => {
    return state.uid
  },
  isAuthenticated: (state) => {
    return !!state.user && !!state.user.uid
  },
}
