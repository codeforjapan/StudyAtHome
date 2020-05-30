import { createModule, action, mutation } from 'vuex-class-component'
import firebase from '@/plugins/firebase.js'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt'
})
type email = string | null
type emailVerified = boolean
type displayName = string | null
type allowAccess = classId[]
type classId = string
type Uid = string | null

interface User {
  email: email
  emailVerified: emailVerified
  displayName: displayName
  allowAccess: allowAccess
  uid: Uid
}

export class UserStore extends VuexModule implements User {
  email: email = null
  emailVerified: emailVerified = false
  displayName: displayName = null
  allowAccess: allowAccess = []
  uid: Uid = null

  public get isAuthenticated(): boolean {
    return !!this.email && !!this.uid && !!this.displayName
  }

  @mutation
  private setUser({
    email,
    emailVerified,
    displayName,
    allowAccess,
    uid
  }: User) {
    this.email = email
    this.emailVerified = emailVerified
    this.displayName = displayName
    this.allowAccess = allowAccess
    this.uid = uid
  }

  @action
  public async login() {
    const user = firebase.auth().currentUser
    if (!user) return

    const data = await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()

    this.setUser({
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      allowAccess: data.get('allow_access'),
      uid: user.uid
    })
  }

  @action
  public async logout() {
    await firebase.auth().signOut()
    this.setUser({
      uid: null,
      email: null,
      emailVerified: false,
      displayName: null,
      allowAccess: []
    })
  }
}
