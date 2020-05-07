<template>
  <h1>{{ uid }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'protected',
  name: 'EditorIndex',
  computed: {
    ...mapGetters('modules/user', ['uid']),
  },
}
</script>

<style scoped></style>
