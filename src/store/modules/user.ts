import { createModule, action, mutation } from 'vuex-class-component'
import { Auth } from 'aws-amplify'

const VuexModule = createModule({
  namespaced: 'user',
  strict: false,
  target: 'nuxt',
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

type LoginWithAPIKEY = boolean
interface User {
  email: Email
  emailVerified: EmailVerified
  displayName: DisplayName
}

interface userData {
  allowAccess: string[]
  username: string
}

export class UserStore extends VuexModule implements User {
  email: Email = ''
  emailVerified: EmailVerified = false
  displayName: DisplayName = ''

  public get isAuthenticated(): Promise<boolean> {
    return (async () => {
      return await Auth.currentAuthenticatedUser()
        .then(() => true)
        .catch(() => false)
    })()
  }

  @mutation
  private setUser({ email, emailVerified, displayName }: User) {
    this.email = email
    this.emailVerified = emailVerified
    this.displayName = displayName
  }

  @action
  public async login() {
    const user = await Auth.currentAuthenticatedUser()
    this.setUser({
      email: user.attributes.email,
      emailVerified: user.attributes.email_verified,
      displayName: user.attributes.name,
    })
  }

  @action
  public async loginFromUserObject(user: any) {
    this.setUser({
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.name,
    })
  }

  @action
  public async logout() {
    await Auth.signOut()
    this.setUser({
      email: '',
      emailVerified: false,
      displayName: '',
    })
  }
}
