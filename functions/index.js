const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const app = express()
const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/',
  },
}
const nuxt = new Nuxt(config)

async function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  await nuxt.ready() // ← nuxt.ready()でawaitしないといけなくなった！！
  return nuxt.render(req, res)
}
app.use(handleRequest)
exports.ssr = functions.https.onRequest(app)
