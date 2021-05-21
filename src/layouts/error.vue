<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink :to="localePath('/')">Home page</NuxtLink>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

type LocalData = {
  pageNotFound: string
  otherError: string
}

export default Vue.extend({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data(): LocalData {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head(): MetaInfo {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
