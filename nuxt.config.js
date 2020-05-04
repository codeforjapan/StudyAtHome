const colors = require('vuetify/es5/util/colors').default
require('dotenv').config()
module.exports = {
  mode: 'universal',
  srcDir: 'src',
  buildDir: '.nuxt',
  /*
   ** Headers of the page
   */
  head: {
    title: 'おうちで時間割',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'おうちにいても先生から課題が届きます！時間割に合わせて楽しく学んでコロナ休校を乗り切ろう！',
      },
      { hid: 'robots', name: 'robots', content: 'noindex' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-precomposed.png' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://studyathome.web.app/ogp.png',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://studyathome.web.app/ogp.png',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'おうちで時間割',
      },
    ],
  },
  env: {
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    DATABASEURL: process.env.DATABASEURL,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,
    MEASUREMENTID: process.env.MEASUREMENTID,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/firebase',
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-svg-loader',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  webfontloader: {
    google: {
      families: ['Roboto&display=swap', 'NotoSansJP&&display=swap'],
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    publicPath: '/assets/',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
