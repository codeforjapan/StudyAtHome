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
      <div class="admin-buttons">
        <v-btn fab x-small outlined rounded color="#0071C2">
          <v-icon>mdi-calendar-today</v-icon>
        </v-btn>
        <v-btn fab x-small outlined rounded color="#0071C2">
          <v-icon>mdi-clipboard-account</v-icon>
        </v-btn>
        <v-btn fab x-small outlined rounded color="#0071C2">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </div>
      <template v-slot:extension>
        <div class="header-calender">
          <CalendarBar />
        </div>
      </template>
    </v-app-bar>
    <v-content class="content">
      <v-container class="classes-container px-4 py-8">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import HeaderLogo from '@/assets/svgs/header_logo.svg'
import CalendarBar from '@/components/CalendarBar.vue'

type LocalData = {
  loading: boolean
}

export default Vue.extend({
  // middleware: 'authenticated',
  components: {
    CalendarBar,
    HeaderLogo
  },
  data(): LocalData {
    return {
      loading: true
    }
  },
  mounted(): void {
    this.loading = false
  },
  methods: {
    signout() {
      vxm.user.logout()
      this.$router.push('/')
    }
  }
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
.admin-buttons {
  padding: 0 4px;
}
</style>
