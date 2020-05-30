import { Middleware } from '@nuxt/types'
import firebase from '@/plugins/firebase.js'
import { vxm } from '@/store'

const authenticated: Middleware = async ({ redirect }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      vxm.user.login()
    } else {
      vxm.user.logout()
      redirect('/account/login')
    }
  })
}

export default authenticated
