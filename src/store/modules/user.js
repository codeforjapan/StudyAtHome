import Cookies from 'js-cookie'
import firebase from '@/plugins/firebase.js'

export const state = () => ({
  userData: null,
  uid: null
})

export const mutations = {
  setUserData(state, payload) {
    if (payload) {
      state.userData = payload
    } else {
      state.userData = null
    }
  },
  setUid(state, payload) {
    if (payload) {
      state.uid = payload
    } else {
      state.uid = null
    }
  }
}

export const actions = {
  async login({ dispatch }) {
    const token = await firebase.auth().currentUser.getIdToken(true)
    Cookies.set('__session', token) // saving token in cookie for server rendering
    const userD = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
    await dispatch('setUserData', { allow_access: userD.allow_access })
    await dispatch('setUid', firebase.auth().currentUser.uid)
  },

  async logout({ commit }) {
    await firebase.auth().signOut()

    Cookies.remove('__session')
    commit('setUserData', null)
    commit('setUid', null)
  },
  setUserData({ commit }, payload) {
    commit('setUserData', payload)
  },
  setUid({ commit }, payload) {
    commit('setUid', payload)
  }
}

export const getters = {
  userData: (state) => {
    return state.userData
  },
  uid: (state) => {
    return state.uid
  },
  isAuthenticated: (state) => {
    return !!state.userData && !!state.userData.uid
  }
}
