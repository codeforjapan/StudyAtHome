import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) return

  if (process.client) {
    window.onNuxtReady(() => {
      createPersistedState({})(store) // vuex plugins can be connected to store, even after creation
    })
  }
}
