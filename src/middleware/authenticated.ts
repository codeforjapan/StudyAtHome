import { Middleware } from '@nuxt/types'
import { vxm } from '@/store'

const authenticated: Middleware = async ({ redirect }) => {
  if (!vxm.user.isAuthenticated) {
    redirect('/user/login')
  }
}

export default authenticated
