const fs = require('fs')
const environment = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `./src/.env.${environment}` })

fs.writeFileSync(
  './src/static/swenv.js',
  `
const swEnv = {
  apiKey: '${process.env.APIKEY}',
  authDomain: '${process.env.AUTHDOMAIN}',
  databaseURL: '${process.env.DATABASEURL}',
  projectId: '${process.env.PROJECTID}',
  storageBucket: '${process.env.STORAGEBUCKET}',
  messagingSenderId: '${process.env.MESSAGINGSENDERID}',
  appId: '${process.env.APPID}',
  measurementId: '${process.env.MEASUREMENTID}'
}
`
)
