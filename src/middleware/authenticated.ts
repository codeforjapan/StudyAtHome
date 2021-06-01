import { Middleware } from '@nuxt/types'
import { withSSRContext } from 'aws-amplify'

const authenticated: Middleware = async ({ redirect, localePath }) => {
  const { Auth } = withSSRContext()
  const userInfo = await Auth.currentUserInfo()

  if (!userInfo) {
    redirect(localePath('/user/login'))
  }
}

export default authenticated
