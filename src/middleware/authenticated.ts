import { Middleware } from '@nuxt/types'
import { Auth } from 'aws-amplify'

const authenticated: Middleware = async ({ redirect }) => {
  const userInfo = await Auth.currentUserInfo()

  if (!userInfo) {
    redirect('/user/login')
  }
}

export default authenticated
