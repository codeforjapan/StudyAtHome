export const state = () => ({
  users: [],
})

export const getters = {
  users: (state) => state.users,
}

export const mutations = {
  setUsers(state, { users }) {
    state.users = users
  },
}

// export const mutations = {
//   setCredential(state, { user }) {
//     state.user = user
//   },
//   savePost(state, { post }) {
//     state.post = post
//   },
//   setIsLoaded(state, next) {
//     state.isLoaded = !!next
//   },
//   ...firebaseMutations
// }

export const actions = {
  async nuxtServerInit({ commit }) {
    const users = []
    const usersSnapshot = await this.$firestore.collection('users').get()
    usersSnapshot.forEach((user) => {
      users.push(user.data())
    })
    commit('setUsers', { users })
  },
}
