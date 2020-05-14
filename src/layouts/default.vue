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
      style="
        background-color: rgba(0, 0, 0, 0);
        color: white;
        text-align: center;
      "
      elevation="10"
    >
      <v-spacer />
      <v-btn icon dark>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-menu>
        <v-btn text dark v-on="on">
          2020/05/14
        </v-btn>
      </v-menu>
      <v-btn icon dark>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-spacer />
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
export default {
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    this.loading = false
  },
}
</script>

<style scoped>
.date-icon {
  margin-right: 15px;
}
</style>
