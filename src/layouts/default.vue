<template>
  <v-app>
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
    <v-app-bar fixed app>
      <v-toolbar-title>
        4<ruby>年<rt>ねん</rt></ruby> 3<ruby>組<rt>くみ</rt></ruby>
      </v-toolbar-title>
      <v-spacer />
      <Calender class="date-icon" />
      <v-toolbar-title>
        4<ruby>月<rt>がつ</rt></ruby> 3<ruby>日<rt>か</rt></ruby>
      </v-toolbar-title>
    </v-app-bar>
    <v-content style="background-color: #0071c2;">
      <v-container class="px-4 py-8">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer dark color="#0071c2">
      <span>&copy; Code For Japan {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Calender from '@/assets/svgs/icon_calender.svg'
export default {
  components: {
    Calender,
  },
}
</script>

<style scoped>
.date-icon {
  margin-right: 15px;
}
</style>
