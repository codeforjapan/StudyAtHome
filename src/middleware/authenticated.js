export default ({ req, redirect }) => {
  if (process.server) {
    const admin = require('firebase-admin')
    const cookieparser = require('cookieparser')
    if (req.headers.cookie) {
      const token = cookieparser.parse(req.headers.cookie).__session
      admin
        .auth()
        .verifyIdToken(token)
        .then(() => {})
        .catch((error) => {
          console.error(error)
          redirect('/account/login')
        })
    } else {
      redirect('/account/login')
    }
  }
}
