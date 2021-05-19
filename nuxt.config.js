import Sass from 'sass'
import Fiber from 'fibers'
import i18nConfig from './nuxt-i18n.config.js'
const environment = process.env.NODE_ENV || 'development'

export default {
  telemetry: false,
  ssr: false,
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
  css: [
    'vuetify/dist/vuetify.min.css',
    '@mdi/font/css/materialdesignicons.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/amplify',
      ssr: false,
    },
    '@/plugins/vuetify',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
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
    ['@nuxtjs/google-analytics', { id: process.env.GAID }],
    '@nuxtjs/dayjs',
  ],
  dayjs: {
    locales: ['ja', 'en', 'zh-tw'],
    defaultLocale: 'ja',
    defaultTimeZone: 'Asia/Tokyo',
    plugins: ['utc', 'timezone', 'minMax', 'isToday', 'localizedFormat'],
  },
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
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber,
        },
      },
    },
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
  styleResources: {
    scss: ['~/assets/variables.scss'],
  },
}
