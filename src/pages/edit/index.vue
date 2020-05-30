<template>
  <h1>{{ email }}</h1>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'

export default Vue.extend({
  layout: 'protected',
  name: 'EditorIndex',
  data() {
    return {
      email: vxm.user.email
    }
  }
})
</script>
