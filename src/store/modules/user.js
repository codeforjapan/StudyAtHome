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
    const userD = this.$fireStore
      .collection('users')
      .doc(this.$fireAuth.currentUser.uid)
    await dispatch('setUserData', { allow_access: userD.allow_access })
    await dispatch('setUid', this.$fireAuth.currentUser.uid)
  },

  async logout({ commit }) {
    await this.$fireAuth.signOut()

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
  userData: state => {
    return state.userData
  },
  uid: state => {
    return state.uid
  },
  isAuthenticated: state => {
    return !!state.userData && !!state.userData.uid
  }
}
