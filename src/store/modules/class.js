import firebase from '@/plugins/firebase'
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
  className(state) {
    return state.classData.className
  },
  schoolName(state) {
    return state.classData.schoolName
  },
  Lessons(state) {
    return state.classData.Lessons
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
  async loadClassData({ dispatch, state }, classId) {
    console.log(classId)
    const classDataSnapshot = await firebase
      .firestore()
      .collection('classData')
      .doc(classId)
      .get()
    const classDa = await classDataSnapshot.data()
    await dispatch('setClassData', classDa)
    await dispatch('setClassId', classId)
  },
  setClassData({ commit }, classData) {
    commit('setClassData', classData)
  },
  setClassId({ commit }, classId) {
    commit('setClassId', classId)
  },
  isLoadedClassData: (state) => {
    return !!state.classData
  },
}
