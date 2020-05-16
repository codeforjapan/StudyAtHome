import {
  VuexModule,
  Module,
  action,
  getter,
  mutation
} from 'vuex-class-component'
import Cookies from 'js-cookie'
import firebase from 'firebase'

interface UserDataState {
  userData: any
  uid: string | null
}

@Module({ namespacedPath: 'modules/class/', target: 'nuxt' })
class UserData extends VuexModule implements UserDataState {
  @getter userData: any = null
  @getter uid: string | null = null
  @getter isAuthenticated: boolean = !!this.userData && !!this.uid

  @mutation
  public setUserData(payload: any) {
    if (payload) {
      this.userData = payload
    } else {
      this.userData = null
    }
  }

  @mutation
  public setUid(payload: string | null) {
    if (payload) {
      this.uid = payload
    } else {
      this.uid = null
    }
  }

  @action
  public async login() {
    const userData: firebase.User | null = firebase.auth().currentUser
    const token: Promise<string> | null = userData
      ? userData.getIdToken(true)
      : null
    if (userData !== null && token !== null) {
      Cookies.set('__session', token) // saving token in cookie for server rendering
      const userD: firebase.firestore.DocumentSnapshot = await firebase
        .firestore()
        .collection('users')
        .doc(userData.uid)
        .get()
      const allowAccess: string = userD.get('allow_access')
      this.setUserData({ allow_access: allowAccess })
      this.setUid(userData.uid)
    }
  }

  @action
  public async logout() {
    await firebase.auth().signOut()

    Cookies.remove('__session')
    this.setUserData(null)
    this.setUid(null)
  }
}

export default UserData.ExtractVuexModule(UserData)
