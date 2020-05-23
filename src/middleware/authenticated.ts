import { Middleware } from '@nuxt/types'

const authenticated: Middleware = async ({ req, redirect }) => {
  if (process.server) {
    // @todo dynamic import で実装する
    const admin = require('firebase-admin')
    const cookieparser = require('cookieparser')
    if (req.headers.cookie) {
      const token = cookieparser.parse(req.headers.cookie).__session
      admin
        .auth()
        .verifyIdToken(token)
        .then(() => {})
        .catch(() => {
          redirect('/account/login')
        })
    } else {
      redirect('/account/login')
    }
  }
}

export default authenticated
