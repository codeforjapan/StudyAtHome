import firebase from '@/plugins/firebase'

export default function ({ store, route, redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      redirect('/account/login')
    } else {
      store.commit('user/setUser', {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        userImage: user.photoURL,
      })
    }
  })
}
