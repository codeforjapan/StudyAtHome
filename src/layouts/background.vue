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
    <v-content class="LayerContent">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppLanguageSelector from '@/components/AppLanguageSelector.vue'
import HeaderLogo from '@/assets/svgs/header_logo.svg'
import HeaderLogoZhtw from '@/assets/svgs/header_logo-zhtw.svg'

type DataType = {
  loading: boolean
}

export default Vue.extend({
  components: {
    AppLanguageSelector,
    HeaderLogo,
    HeaderLogoZhtw,
  },
  data(): DataType {
    return {
      loading: true,
    }
  },
  mounted(): void {
    this.loading = false
  },
})
</script>

<style scoped lang="scss">
.LayerContent {
  background-color: $color-base-color-01;
}
</style>
