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
type AllowAccess = AllowAccessData[]
type AllowAccessData = {
  classId: string
  schoolName: string
  className: string
}
type AllowAccessFromUsers = {
  classId: string
  schoolName: string
}
type Uid = string | null

interface User {
  email: Email
  emailVerified: EmailVerified
  displayName: DisplayName
  allowAccess: AllowAccess
  uid: Uid
}

interface userData {
  allowAccess: string[]
  username: string
}

export class UserStore extends VuexModule implements User {
  email: Email = null
  emailVerified: EmailVerified = false
  displayName: DisplayName = null
  allowAccess: AllowAccess = []
  uid: Uid = null

  public get isAuthenticated(): boolean {
    return !!this.email && !!this.uid
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

    const allowAccessData: AllowAccessFromUsers[] = data.get('allow_access')
    const allowAccess = []
    for (const value of allowAccessData) {
      const classData = await firebase
        .firestore()
        .collection('classData')
        .doc(value.classId)
        .get()
      const editorClassData = await firebase
        .firestore()
        .collection('editorClassData')
        .doc(value.classId)
        .get()
      allowAccess.push({
        classId: value.classId,
        schoolName: editorClassData.get('schoolName'),
        className: classData.get('className')
      })
    }

    this.setUser({
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: data.get('username'),
      allowAccess,
      uid: user.uid
    })
  }

  @action
  public async loginFromUserObject(user: any) {
    const data = await firebase
      .firestore()
      .collection('users')
      .doc(user.user_id)
      .get()

    const allowAccessData: AllowAccessFromUsers[] = data.get('allow_access')
    const allowAccess = []
    for (const value of allowAccessData) {
      const classData = await firebase
        .firestore()
        .collection('classData')
        .doc(value.classId)
        .get()
      const editorClassData = await firebase
        .firestore()
        .collection('editorClassData')
        .doc(value.classId)
        .get()
      allowAccess.push({
        classId: value.classId,
        schoolName: editorClassData.get('schoolName'),
        className: classData.get('className')
      })
    }

    this.setUser({
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: data.get('username'),
      allowAccess,
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
