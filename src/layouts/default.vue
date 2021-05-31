<template>
  <v-app>
    <v-overlay :value="loading" color="#0071C2" opacity="1" z-index="9999">
      <div class="loader">Loading</div>
    </v-overlay>
    <v-app-bar fixed app class="bar" elevation="0">
      <header-logo-zhtw v-if="$root.$i18n.locale === 'zh-tw'" />
      <header-logo v-else />
      <AppLanguageSelector />
    </v-app-bar>
    <v-content class="content">
      <v-container class="px-4 py-8">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppLanguageSelector from '@/components/AppLanguageSelector.vue'
import HeaderLogo from '@/assets/svgs/header_logo.svg'
import HeaderLogoZhtw from '@/assets/svgs/header_logo-zhtw.svg'

type LocalData = {
  loading: boolean
}

export default Vue.extend({
  components: {
    AppLanguageSelector,
    HeaderLogo,
    HeaderLogoZhtw,
  },
  data(): LocalData {
    return {
      loading: true,
    }
  },
  head() {
    const ogpImage = () => {
      switch (this.$i18n.locale) {
        case 'zh-tw':
          return `https://app.studyathome.jp/ogp-${this.$i18n.locale}.png`
        default:
          return 'https://app.studyathome.jp/ogp.png'
      }
    }
    return {
      title: this.$tc('title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$tc('description'),
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: this.$tc('title'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$tc('title'),
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$tc('description'),
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: this.$tc('title'),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogpImage(),
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1200',
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '630',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ogpImage(),
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://app.studyathome.jp${this.$route.path}`,
        },
      ],
    }
  },
  mounted(): void {
    ;(this as any).loading = false
  },
})
</script>

<style scoped lang="scss">
.date-icon {
  margin-right: 15px;
}
.bar {
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  text-align: center;
}
.content {
  background-color: $color-base-color-01;
}
.loader {
  color: $color-white;
}
</style>
