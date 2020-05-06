export const state = () => ({
  classId: '',
  classData: {},
})

export const getters = {
  classData(state) {
    return state.classData
  },
  classId(state) {
    return state.classId
  },
}

export const mutations = {
  setClassData(state, classData) {
    state.classData = classData
  },
  setClassId(state, classId) {
    state.classId = classId
  },
}

export const actions = {
  setClassData({ commit }, classData) {
    commit('setClassData', classData)
  },
  setClassId({ commit }, classId) {
    commit('setClassId', classId)
  },
}
