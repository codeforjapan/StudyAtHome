import { createModule, action, mutation } from 'vuex-class-component'
import firebase from '@/plugins/firebase.js'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt'
})
type Email = string
type EmailVerified = boolean
type DisplayName = string
type AllowAccess = AllowAccessData[]
type AllowAccessData = {
  classId: string
  schoolName: string
  className: string
}

type Uid = string

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
  email: Email = ''
  emailVerified: EmailVerified = false
  displayName: DisplayName = ''
  allowAccess: AllowAccess = []
  uid: Uid = ''

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

    const allowAccessClassIds: string[] = data.get('allow_access')
    const allowAccessData: AllowAccessData[] = []
    for (const value of allowAccessClassIds) {
      const classData = await firebase
        .firestore()
        .collection('classData')
        .doc(value)
        .get()
      const editorClassData = await firebase
        .firestore()
        .collection('editorClassData')
        .doc(value)
        .get()
      allowAccessData.push({
        classId: value,
        schoolName: editorClassData.get('schoolName'),
        className: classData.get('className')
      })
    }

    this.setUser({
      email: user.email ? user.email : '',
      emailVerified: user.emailVerified,
      displayName: data.get('username'),
      allowAccess: allowAccessData,
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

    const allowAccessClassIds: string[] = data.get('allow_access')
    const allowAccessData: AllowAccessData[] = []
    for (const value of allowAccessClassIds) {
      const classData = await firebase
        .firestore()
        .collection('classData')
        .doc(value)
        .get()
      const editorClassData = await firebase
        .firestore()
        .collection('editorClassData')
        .doc(value)
        .get()
      allowAccessData.push({
        classId: value,
        schoolName: editorClassData.get('schoolName'),
        className: classData.get('className')
      })
    }

    this.setUser({
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: data.get('username'),
      allowAccess: allowAccessData,
      uid: user.user_id
    })
  }

  @action
  public async logout() {
    await firebase.auth().signOut()
    this.setUser({
      uid: '',
      email: '',
      emailVerified: false,
      displayName: '',
      allowAccess: []
    })
  }
}
