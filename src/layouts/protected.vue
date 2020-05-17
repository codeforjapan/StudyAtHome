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
    <v-app-bar fixed app>
      <v-toolbar-title>
        Editor 4<ruby>年<rt>ねん</rt></ruby> 3<ruby>組<rt>くみ</rt></ruby>
      </v-toolbar-title>
      <v-spacer />
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
      <a href="#" @click="signout">Logout</a>
      <span>&copy; Code For Japan {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

type LocalData = {
  loading: boolean
}

export default Vue.extend({
  middleware: 'authenticated',
  data(): LocalData {
    return {
      loading: true
    }
  },
  mounted(): void {
    this.loading = false
  },
  methods: {
    ...mapActions('modules/user', ['logout']),
    signout() {
      this.logout()
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>
.date-icon {
  margin-right: 15px;
}
</style>
