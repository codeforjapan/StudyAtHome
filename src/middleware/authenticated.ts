import { Middleware } from '@nuxt/types'
import { Auth } from 'aws-amplify'

const authenticated: Middleware = async ({ redirect, localePath }) => {
  const userInfo = await Auth.currentUserInfo()

  if (!userInfo) {
    redirect(localePath('/user/login'))
  }
}

export default authenticated
