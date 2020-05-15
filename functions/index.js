const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')

process.env.STORAGEBUCKET = functions.config().environment.storagebucket
process.env.MESSAGINGSENDERID = functions.config().environment.messagingsenderid
process.env.AUTHDOMAIN = functions.config().environment.authdomain
process.env.APIKEY = functions.config().environment.apikey
process.env.DATABASEURL = functions.config().environment.databaseurl
process.env.APPID = functions.config().environment.appid
process.env.PROJECTID = functions.config().environment.projectid
process.env.MEASUREMENTID = functions.config().environment.measurementid

const app = express()
const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/'
  }
}
const nuxt = new Nuxt(config)

async function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  await nuxt.ready() // ← nuxt.ready()でawaitしないといけなくなった！！
  return nuxt.render(req, res)
}
app.use(handleRequest)
exports.ssr = functions.https.onRequest(app)
