import { Middleware } from '@nuxt/types'
import { withSSRContext } from 'aws-amplify'

const authenticated: Middleware = async ({ redirect }) => {
  const { Auth } = withSSRContext()
  const userInfo = await Auth.currentUserInfo()

  if (!userInfo) {
    redirect('/user/login')
  }
}

export default authenticated
