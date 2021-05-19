const defaultLocale = 'ja'

const options = {
  strategy: 'no_prefix',
  detectBrowserLanguage: false,
  defaultLocale,
  vueI18n: {
    fallbackLocale: defaultLocale,
    formatFallbackMessages: true,
  },
  lazy: true,
  langDir: 'assets/locales/',
  locales: [
    {
      code: 'ja',
      displayName: '日本語',
      file: 'ja.json',
      format: 'ja',
    },
    {
      code: 'en',
      displayName: 'English',
      file: 'en.json',
      format: 'en',
    },
    {
      code: 'zh-goyu',
      displayName: '台灣華語',
      file: 'zh_TW.json',
      format: 'zh-tw',
    },
  ],
}

export default options
