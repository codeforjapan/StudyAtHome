export const state = () => ({
  user: null,
  info: null,
})

export const mutations = {
  setUser(state, payload) {
    if (payload) {
      state.user = payload
    } else {
      state.user = null
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
  setUser({ commit }, payload) {
    commit('setUser', payload)
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
}
