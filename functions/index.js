const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
const app = express()

process.env.STORAGEBUCKET = functions.config().environment.storagebucket
process.env.MESSAGINGSENDERID = functions.config().environment.messagingsenderid
process.env.AUTHDOMAIN = functions.config().environment.authdomain
process.env.APIKEY = functions.config().environment.apikey
process.env.DATABASEURL = functions.config().environment.databaseurl
process.env.APPID = functions.config().environment.appid
process.env.PROJECTID = functions.config().environment.projectid
process.env.MEASUREMENTID = functions.config().environment.measurementid

const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/',
  },
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=10, s-maxage=10')
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, (promise) => {
      promise.then(resolve).catch(reject)
    })
  })
}

app.use(handleRequest)
exports.ssr = functions.https.onRequest(app)
