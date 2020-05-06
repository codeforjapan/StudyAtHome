import Cookies from 'js-cookie'
import firebase from '@/plugins/firebase.js'

export const state = () => ({
  userData: null,
})

export const mutations = {
  setUserData(state, payload) {
    if (payload) {
      state.userData = payload
    } else {
      state.userData = null
    }
  },
}

export const actions = {
  async login({ dispatch, state }, user) {
    const token = await firebase.auth().currentUser.getIdToken(true)
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
    }
    Cookies.set('access_token', token) // saving token in cookie for server rendering
    await dispatch('setUserData', userInfo)
  },

  async logout({ commit }) {
    await firebase.auth().signOut()

    Cookies.remove('access_token')
    commit('setUserData', null)
  },
  setUserData({ commit }, payload) {
    commit('setUserData', payload)
  },
}

export const getters = {
  userData: (state) => {
    return state.userData
  },
  isAuthenticated: (state) => {
    return !!state.userData && !!state.userData.uid
  },
}
