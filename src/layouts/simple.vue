<template>
  <v-app>
    <v-overlay :value="loading" color="#0071C2" opacity="1" z-index="9999">
      <div class="loader">
        Loading
      </div>
    </v-overlay>
    <v-app-bar fixed app class="bar" elevation="0">
      <HeaderLogo />
      <v-spacer />
      <v-btn outlined rounded color="#0071C2" @click="$router.back()">
        <v-icon left>mdi-arrow-left</v-icon>
        {{ $t('common.general.buttons.go_back') }}
      </v-btn>
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
import HeaderLogo from '@/assets/svgs/header_logo.svg'

type LocalData = {
  loading: boolean
}

export default Vue.extend({
  components: { HeaderLogo },
  data(): LocalData {
    return {
      loading: true
    }
  },
  mounted(): void {
    this.loading = false
  }
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
