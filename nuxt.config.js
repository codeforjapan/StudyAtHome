import i18nConfig from './nuxt-i18n.config.js'
const colors = require('vuetify/es5/util/colors').default
const environment = process.env.NODE_ENV || 'development'

export default {
  telemetry: false,
  mode: 'universal',
  srcDir: 'src',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
    },
    title: 'おうちで時間割',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keyword',
        name: 'keyword',
        content: 'CodeforJapan, おうちで時間割, デジタル, 学び, 今後の学習',
      },
      {
        hid: 'author',
        name: 'author',
        content: 'Code for Japan',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'おうちで時間割',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `https://app.studyathome.jp/`,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'おうちで時間割',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '子どもの学びにデジタルの活用を - 臨時休校期間と今後の学習に向けて 簡単に楽しく学べる環境を今だから、みんなでつくろう。',
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'おうちで時間割',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '子どもの学びにデジタルの活用を - 臨時休校期間と今後の学習に向けて 簡単に楽しく学べる環境を今だから、みんなでつくろう。',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://app.studyathome.jp/ogp.png',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://app.studyathome.jp/ogp.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-precomposed.png' },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000000' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/amplify',
      ssr: false,
    },
    {
      src: '@/plugins/persistedstate.js',
      ssr: false,
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { filename: `.env.${environment}` }],
    'nuxt-svg-loader',
    ['nuxt-i18n', i18nConfig],
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
  manifest: {
    name: 'おうちで時間割',
    short_name: 'おうちで時間割',
    theme_color: '#0071C2',
    background_color: '#ffffff',
    display: 'standalone',
    Scope: '/',
    start_url: '/',
    splash_pages: null,
  },
  // workbox: {
  //   importScripts: ['swenv.js'],
  //   dev: process.env.NODE_ENV !== 'production',
  // },
  /*
   ** Build configuration
   */
  build: {
    publicPath: '/assets/',
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
