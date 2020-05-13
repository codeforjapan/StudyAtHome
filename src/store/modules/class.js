import firebase from '@/plugins/firebase'
export const state = () => ({
  classId: '',
  classData: {},
  ViewDate: '',
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
  ViewDate(state) {
    return state.ViewDate
  },
  isLoadedClassData: (state) => {
    return state.classId !== ''
  },
}

export const mutations = {
  setClassData(state, classData) {
    state.classData = classData
  },
  setClassId(state, classId) {
    state.classId = classId
  },
  setViewDate(state, date) {
    state.ViewDate = date
  },
  nextDate(state) {
    state.ViewDate = this.$dayjs(state.ViewDate)
      .add(1, 'd')
      .format('YYYY-MM-DD')
  },
  prevDate(state) {
    state.ViewDate = this.$dayjs(state.ViewDate)
      .subtract(1, 'd')
      .format('YYYY-MM-DD')
  },
}

export const actions = {
  async loadClassData({ dispatch, state }, classId) {
    const classDataSnapshot = await firebase
      .firestore()
      .collection('classData')
      .doc(classId)
      .get()
    const classDa = await classDataSnapshot.data()
    await dispatch('setClassData', classDa)
    await dispatch('setClassId', classId)
    await dispatch('isLoadedClassData')
  },
  setClassData({ commit }, classData) {
    commit('setClassData', classData)
  },
  setClassId({ commit }, classId) {
    commit('setClassId', classId)
  },
  setViewDate({ commit }, date) {
    commit('setViewDate', date)
  },
  prevDate({ commit }) {
    commit('prevDate')
  },
  nextDate({ commit }) {
    commit('nextDate')
  },
  isLoadedClassData: (state) => {
    return state.classData !== {}
  },
}
