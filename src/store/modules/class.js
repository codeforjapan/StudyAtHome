export const state = () => ({
  classData: {},
})

export const getters = {
  classData(state) {
    return state.classData
  },
}

export const mutations = {
  setClassData(state, classData) {
    state.classData = classData
  },
}

export const actions = {
  setClassData({ commit }, classData) {
    commit('setClassData', classData)
  },
}
