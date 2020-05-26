<template>
  <v-app>
    <v-overlay v-if="loading" color="#F8F9FA" opacity="1" z-index="9999">
      <div class="loader">
        Loading
      </div>
    </v-overlay>
    <!--
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    -->
    <v-app-bar
      fixed
      app
      dense
      class="bar"
      style="background-color: rgba(0, 0, 0, 0)"
      elevation="0"
    >
      <span>
        {{ classData.schoolName }}
      </span>
      <v-spacer />
      <div class="date">
        <v-btn icon small dark @click="classData.prevDate">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="classData.displayDate"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn text dark style="padding: 0 0;" v-on="on">
              {{ classData.displayDate }}
            </v-btn>
          </template>
          <v-date-picker v-model="classData.displayDate" no-title scrollable>
            <v-spacer />
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(classData.displayDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-btn icon small dark @click="classData.nextDate">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <span>
        {{ classData.className }}
      </span>
    </v-app-bar>
    <v-content class="content">
      <v-container class="px-4 py-8">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer dark color="#0071c2">
      <span>&copy; Code For Japan {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { vxm } from '@/store'

type LocalData = {
  loading: boolean
  menu: boolean
  classData: typeof vxm.classData
}

export default Vue.extend({
  middleware: 'checkClassData',
  data(): LocalData {
    return {
      loading: true,
      menu: false,
      classData: vxm.classData
    }
  },
  mounted(): void {
    this.loading = false
    this.classData.displayDate = dayjs().format('YYYY-MM-DD')
  }
})
</script>

<style scoped lang="scss">
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
  background-color: rgba(0, 0, 0, 0);
  color: white;
  text-align: center;
}
.content {
  background-color: $color-base-color-01;
}
</style>
