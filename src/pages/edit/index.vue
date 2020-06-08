<template>
  <div>
    <h1>{{ user.uid }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.emailVerified }}</h1>
    <h1>{{ user.displayName }}</h1>
    <h1>{{ user.allowAccess }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'

export default Vue.extend({
  layout: 'protected',
  name: 'EditorIndex',
  data() {
    return {
      user: vxm.user
    }
  }
})
</script>
