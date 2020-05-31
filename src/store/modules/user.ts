import { createModule, action, mutation } from 'vuex-class-component'
import firebase from '@/plugins/firebase.js'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt'
})
type Email = string | null
type EmailVerified = boolean
type DisplayName = string | null
type AllowAccess = ClassId[]
type ClassId = string
type Uid = string | null

interface User {
  email: Email
  emailVerified: EmailVerified
  displayName: DisplayName
  allowAccess: AllowAccess
  uid: Uid
}

export class UserStore extends VuexModule implements User {
  email: Email = null
  emailVerified: EmailVerified = false
  displayName: DisplayName = null
  allowAccess: AllowAccess = []
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
    if (process.client) {
      const user = firebase.auth().currentUser
      if (!user) return
      /*
      const data = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
       */

      this.setUser({
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        allowAccess: [],
        uid: user.uid
      })
    }
  }

  @action
  public async loginFromUserObject(user: any) {
    if (!user) return
    this.setUser({
      email: user.email,
      emailVerified: user.email_verified,
      displayName: user.display_name,
      allowAccess: [],
      uid: user.user_id
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
