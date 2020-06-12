<template>
  <v-app>
    <v-overlay :value="loading" color="#0071C2" opacity="1" z-index="9999">
      <div class="loader">
        Loading
      </div>
    </v-overlay>
    <v-app-bar fixed app class="bar" elevation="0">
      <header-logo />
    </v-app-bar>
    <v-content class="LayerContent">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderLogo from '@/assets/svgs/header_logo.svg'

type DataType = {
  loading: boolean
}

export default Vue.extend({
  components: {
    HeaderLogo
  },
  data(): DataType {
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
.LayerContent {
  background-color: $color-base-color-01;
}
</style>
