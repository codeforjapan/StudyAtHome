// eslint-disable-next-line import/no-mutable-exports
let admin = null
if (process.server) {
  admin = require('firebase-admin')
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://studyathome.firebaseio.com',
    })
  }
}

// eslint-disable-next-line no-undef
export default admin
