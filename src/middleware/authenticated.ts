import { Middleware } from '@nuxt/types'
import { Auth } from 'aws-amplify'

const authenticated: Middleware = async ({ redirect }) => {
  const userInfo = await Auth.currentUserInfo()

  if (!userInfo) {
    redirect('/user/auth')
  }
}

export default authenticated
