import { createModule, action } from 'vuex-class-component'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt'
})

/* interface User {
  userData: any
  uid: string | null
} */

export class UserStore extends VuexModule {
  userData: any = null
  uid: string | null = null

  public get isAuthenticated(): boolean {
    return !!this.userData && !!this.uid
  }

  @action
  public async login() {
    if (this.$store.$fireAuth.currentUser) {
      const userD = await this.$store.$fireStore
        .collection('users')
        .doc(this.$store.$fireAuth.currentUser.uid)
        .get()
      this.userData = { allow_access: userD.get('allow_access') }
      this.uid = this.$store.$fireAuth.currentUser.uid
    }
  }

  @action
  public async logout() {
    await this.$store.$fireAuth.signOut()

    this.userData = null
    this.uid = null
  }
}
