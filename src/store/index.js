import cloneDeep from 'lodash.clonedeep'

export const state = () => ({
  user: null,
  users: [],
  posts: [],
  isFetching: false,
})

export const getters = {
  user: (state) => state.user,
  posts: (state) => state.posts,
  isFetching: (state) => state.isFetching,
}

export const mutations = {
  setUser(state, { user }) {
    state.user = cloneDeep(user)
  },
  setUsers(state, { users }) {
    state.users = users
  },
  setPosts(state, { posts }) {
    state.posts = [...posts]
  },
  addPost(state, { post }) {
    if (state.posts.find((p) => p.id === post.id)) {
      return
    }
    post.user = state.users.find((user) => user.email === post.from)
    state.posts = [...state.posts, post]
  },
  unshiftPost(state, { post }) {
    if (state.posts.find((p) => p.id === post.id)) {
      return
    }
    post.user = state.users.find((user) => user.email === post.from)
    state.posts = [post, ...state.posts]
  },
  setIsFetching(state, next) {
    state.isFetching = !!next
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
    const posts = []
    const users = []
    const [usersSnapshot, postsSnapshot] = await Promise.all([
      this.$firestore.collection('users').get(),
      this.$firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get(),
    ])
    usersSnapshot.forEach((user) => {
      users.push(user.data())
    })
    postsSnapshot.forEach((postSnapshot) => {
      const post = postSnapshot.data()
      post.user = users.find((user) => user.email === post.from)
      posts.unshift(post)
    })
    commit('setUsers', { users })
    commit('setPosts', { posts })
  },
  async fetchPosts({ commit, state }) {
    if (state.setIsFetching) return
    commit('setIsFetching', true)
    try {
      const posts = []
      const postsSnapshot = await this.$firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .startAfter(state.posts[0].createdAt)
        .limit(20)
        .get()
      postsSnapshot.forEach((postSnapshot) => {
        const post = postSnapshot.data()
        post.user = state.users.find((user) => user.email === post.from)
        posts.push(post)
      })
      posts.forEach((post) => {
        commit('unshiftPost', { post })
      })
      return posts[0]
    } catch (e) {
    } finally {
      commit('setIsFetching', false)
    }
  },
}
