<template>
  <v-app>
    <v-overlay
      v-if="loading"
      color="$color-base-color-01"
      opacity="1"
      z-index="9999"
    >
      <div class="loader">
        Loading
      </div>
    </v-overlay>
    <v-content class="content">
      <v-container class="px-4 py-8">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

type LocalData = {
  loading: boolean
}

export default Vue.extend({
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
