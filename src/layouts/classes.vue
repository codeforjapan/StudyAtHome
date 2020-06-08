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
      <v-btn fab small outlined rounded color="#0071C2">
        <v-icon>mdi-clipboard-account</v-icon>
      </v-btn>
      <template v-slot:extension>
        <div class="header-calender">
          <CalendarBar v-model="date" />
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
import HeaderLogo from '@/assets/svgs/header_logo.svg'
import CalendarBar from '@/components/CalendarBar.vue'
import { vxm } from '@/store'

type LocalData = {
  loading: boolean
  date: Date
}

export default Vue.extend({
  middleware: 'checkClassData',
  components: {
    CalendarBar,
    HeaderLogo
  },
  data(): LocalData {
    return {
      loading: true,
      date: new Date()
    }
  },
  watch: {
    date(value) {
      vxm.classData.setDate(value)
    }
  },
  mounted(): void {
    this.loading = false
  }
})
</script>

<style scoped lang="scss">
.v-btn {
  font-family: 'Noto Sans', 'Noto Sans JP', sans-serif;
  font-style: normal;
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
