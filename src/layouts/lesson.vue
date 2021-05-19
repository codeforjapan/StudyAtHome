<template>
  <v-app>
    <v-overlay :value="loading" color="#0071C2" opacity="1" z-index="9999">
      <div class="loader">Loading</div>
    </v-overlay>
    <v-app-bar fixed app class="bar" elevation="0">
      <header-logo-zhtw v-if="$root.$i18n.locale === 'zh-goyu'" />
      <header-logo v-else />
      <AppLanguageSelector />
      <v-spacer />
      <v-btn outlined rounded color="#0071C2" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
        {{ $t('common.general.buttons.go_back') }}
      </v-btn>
    </v-app-bar>
    <v-content class="content">
      <!--      <v-container class="classes-container px-4 py-8">-->
      <v-container class="classes-container px-4 py-4">
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
// import { vxm } from '@/store'

type LocalData = {
  loading: boolean
  date: Date
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
      date: new Date(),
    }
  },
  // watch: {
  //   date(value) {
  //     vxm.app.setDate(value)
  //   }
  // },
  mounted(): void {
    this.loading = false
  },
  methods: {
    back() {
      this.$router.back()
    },
  },
})
</script>

<style scoped lang="scss">
.v-btn {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  background-color: $color-white;
}

.date-icon {
  margin-right: 15px;
}

.date {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bar {
  background-color: $color-back-gray;
  text-align: center;
}

.content {
  background-color: $color-base-color-01;
}

.header-calender {
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  height: 40px;
}

.classes-container {
  height: 100%;
}
</style>
