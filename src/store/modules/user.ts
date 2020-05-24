import { createModule, action, mutation } from 'vuex-class-component'
import Cookies from 'js-cookie'
import firebase from '@/plugins/firebase.js'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt'
})

type UserData = any
type Uid = string | null

interface User {
  userData: UserData
  uid: Uid
}

export class UserStore extends VuexModule implements User {
  userData: UserData = null
  uid: Uid = null

  public get isAuthenticated(): boolean {
    return !!this.userData && !!this.uid
  }

  @mutation
  private setUser({ userData, uid }: User) {
    this.userData = userData
    this.uid = uid
  }

  @action
  public async login() {
    const user = firebase.auth().currentUser
    if (!user) return

    const token = await user.getIdToken(true)
    Cookies.set('__session', token) // saving token in cookie for server rendering
    const data = await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()

    this.setUser({
      uid: user.uid,
      userData: { allow_access: data.get('allow_access') }
    })
  }

  @action
  public async logout() {
    await firebase.auth().signOut()
    Cookies.remove('__session')
    this.setUser({
      uid: null,
      userData: null
    })
  }
}
