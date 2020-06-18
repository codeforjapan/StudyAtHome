<template>
  <v-app>
    <v-dialog v-model="openCalenderDialog" max-width="320px">
      <v-date-picker
        v-model="date"
        locale="ja"
        first-day-of-week="1"
        @input="openCalenderDialog = false"
      />
    </v-dialog>
    <base-dialog
      v-model="openClassIdDialog"
      icon-name="mdi-clipboard-account"
      default-cancel-button-label="閉じる"
      :actions="[
        {
          buttonLabel: 'クラスの切替・登録',
          action: () => {
            this.$router.push('/user/classlist')
            return false
          }
        }
      ]"
    >
      <template v-slot:title>
        今、ログインしているクラスです
      </template>
      <template v-slot:default>
        <div class="ClassIdModal-Contents">
          <p class="ClassIdModal-ClassText">{{ classData.className }}</p>
          <p class="ClassIdModal-Text">クラスID</p>
          <div class="ClassIdModal-Id">{{ classData.classId }}</div>
        </div>
      </template>
    </base-dialog>
    <v-overlay :value="loading" color="#0071C2" opacity="1" z-index="9999">
      <div class="loader">
        Loading
      </div>
    </v-overlay>
    <v-app-bar fixed app class="bar" elevation="0">
      <HeaderLogo />
      <v-spacer />
      <div class="admin-buttons">
        <v-btn
          fab
          x-small
          outlined
          rounded
          color="#0071C2"
          @click="openCalenderDialog = true"
        >
          <v-icon>mdi-calendar-today</v-icon>
        </v-btn>
        <v-btn
          fab
          x-small
          outlined
          rounded
          color="#0071C2"
          @click="openClassIdDialog = true"
        >
          <v-icon>mdi-clipboard-account</v-icon>
        </v-btn>
        <v-btn
          fab
          x-small
          outlined
          rounded
          color="#0071C2"
          @click="$router.push('/user/editUserData')"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </div>
      <template v-slot:extension>
        <div class="header-calender">
          <CalendarBar v-model="app.currentDate" />
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
import dayjs from 'dayjs'
import { vxm } from '@/store'
import HeaderLogo from '@/assets/svgs/header_logo.svg'
import CalendarBar from '@/components/CalendarBar.vue'
import BaseDialog from '@/components/BaseDialog.vue'

type LocalData = {
  loading: boolean
  openCalenderDialog: boolean
  openClassIdDialog: boolean
  app: typeof vxm.app
}

export default Vue.extend({
  middleware: ['authenticated', 'checkClassData'],
  components: {
    CalendarBar,
    BaseDialog,
    HeaderLogo
  },
  data(): LocalData {
    return {
      loading: true,
      openCalenderDialog: false,
      openClassIdDialog: false,
      app: vxm.app
    }
  },
  computed: {
    date: {
      get() {
        return dayjs(vxm.app.currentDate).format('YYYY-MM-DD')
      },
      set(newValue: string) {
        vxm.app.setDate(dayjs(newValue).toDate())
      }
    },
    classData() {
      return vxm.classData
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
.ClassIdModal-Contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.ClassIdModal-Text {
  font-size: 16px;
  font-weight: bold;
  color: $color-gray;
  margin: 6px 0 12px;
}
.ClassIdModal-ClassText {
  font-size: 16px;
  color: $color-gray;
  margin: 6px 0 12px;
}
.ClassIdModal-Id {
  max-width: 9em;
  padding: 16px 24px;
  text-align: center;
  background-color: $color-back-gray;
  border: 2px solid $color-base-color-01;
  border-radius: 14px;
  letter-spacing: 0.2em;
  line-height: 1.25;
  font-size: 30px;
  color: $color-gray;
}
</style>
