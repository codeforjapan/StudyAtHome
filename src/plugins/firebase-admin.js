// eslint-disable-next-line import/no-mutable-exports
let admin
if (process.server) {
  admin = require('firebase-admin')
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://studyathome-dev.firebaseio.com'
    })
  }
}

export default admin
