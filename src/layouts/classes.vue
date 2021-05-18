<template>
  <v-app>
    <v-dialog v-model="openCalenderDialog" max-width="320px">
      <v-date-picker
        v-model="date"
        locale="ja"
        first-day-of-week="1"
        width="100%"
        class="mb-4"
        @input="openCalenderDialog = false"
      />
      <base-action-button
        theme="secondary"
        :text="$t('common.calender.to_today')"
        @click="
          date = new Date()
          openCalenderDialog = false
        "
      />
    </v-dialog>
    <base-dialog
      v-model="openClassIdDialog"
      icon-name="mdi-clipboard-account"
      hide-default-cancel-button
      :actions="[
        {
          buttonLabel: $t('common.general.buttons.close'),
          iconName: '',
          theme: 'primary',
          action: () => {
            return false
          },
        },
        {
          buttonLabel: $t('common.general.buttons.logout'),
          iconName: 'mdi-login-variant',
          theme: 'border',
          action: () => {
            clickLogout()
            return false
          },
        },
      ]"
    >
      <template v-slot:title>
        {{ $t('common.class_id_dialog.title') }}
      </template>
      <template v-slot:default>
        <div class="ClassIdModal-Contents">
          <p class="ClassIdModal-ClassText">{{ className }}</p>
          <p class="ClassIdModal-Text">
            {{ $t('common.class_id_dialog.label.class_id') }}
          </p>
          <div class="ClassIdModal-Id">{{ classId }}</div>
        </div>
      </template>
    </base-dialog>
    <v-overlay :value="loading" color="#0071C2" opacity="1" z-index="9999">
      <div class="loader">Loading</div>
    </v-overlay>
    <v-app-bar fixed app class="bar" elevation="0" extension-height="83">
      <HeaderLogo />
      <AppLanguageSelector />
      <v-spacer />
      <div class="classes-buttons">
        <v-btn
          fab
          small
          outlined
          rounded
          color="#0071C2"
          @click="openClassIdDialog = true"
        >
          <v-icon>mdi-clipboard-account</v-icon>
        </v-btn>
      </div>
      <template v-slot:extension>
        <div class="header-calender">
          <CalendarBar
            v-model="app.currentDate"
            @showCalender="openCalenderDialog = true"
          />
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
import AppLanguageSelector from '@/components/AppLanguageSelector.vue'
import HeaderLogo from '@/assets/svgs/header_logo.svg'
import CalendarBar from '@/components/CalendarBar.vue'
import BaseDialog from '@/components/BaseDialog.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import { vxm } from '@/store'

type LocalData = {
  loading: boolean
  openCalenderDialog: boolean
  openClassIdDialog: boolean
  classId: string
  className: string
  app: typeof vxm.app
}

export default Vue.extend({
  middleware: 'checkClassData',
  components: {
    AppLanguageSelector,
    CalendarBar,
    BaseDialog,
    HeaderLogo,
    BaseActionButton,
  },
  data(): LocalData {
    return {
      loading: true,
      openCalenderDialog: false,
      openClassIdDialog: false,
      classId: vxm.classData.classId,
      className: vxm.classData.className,
      app: vxm.app,
    }
  },
  computed: {
    date: {
      get() {
        return this.$dayjs(vxm.app.currentDate).format('YYYY-MM-DD')
      },
      set(newValue: string) {
        vxm.app.setDate(newValue)
      },
    },
  },
  mounted(): void {
    ;(this as any).loading = false
  },
  methods: {
    async clickLogout() {
      await vxm.user.logout()
      await vxm.app.resetDate()
      await this.$router.push('/')
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
  height: 100%;
}
.classes-container {
  height: 100%;
}
.classes-buttons {
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
