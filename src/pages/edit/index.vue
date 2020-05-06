<template>
  <h1>{{ userData }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'protected',
  name: 'IndexVue',
  computed: {
    ...mapGetters('modules/user', ['userData']),
  },
}
</script>

<style scoped></style>
