import { createModule, action, mutation } from 'vuex-class-component'
import Cookies from 'js-cookie'
import firebase from '@/plugins/firebase.js'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt'
})

/* interface User {
  userData: any
  uid: string | null
} */

type SetPayloadType = {
  userData: any
  uid: string | null
}

export class UserStore extends VuexModule {
  userData: any = null
  uid: string | null = null

  public get isAuthenticated(): boolean {
    return !!this.userData && !!this.uid
  }

  @mutation
  private SET({ userData, uid }: SetPayloadType) {
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

    this.SET({
      uid: user.uid,
      userData: { allow_access: data.get('allow_access') }
    })
    // this.userData = { allow_access: data.get('allow_access') }
    // this.uid = user.uid
  }

  @action
  public async logout() {
    await firebase.auth().signOut()
    Cookies.remove('__session')
    this.SET({
      uid: null,
      userData: null
    })
    // this.userData = null
    // this.uid = null
  }
}
