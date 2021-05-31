<template>
  <div>
    <base-bottom-sheet-layer
      fullscreen
      :title="$t('pages.user_logout.title')"
      title-en="LOGOUT"
    />
    <v-snackbar v-model="error" :timeout="5000" top color="#C01B61">
      {{ $t('pages.user_logout.error.invalid') }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import { withSSRContext } from 'aws-amplify'
import { vxm } from '@/store'

export default Vue.extend({
  components: { BaseBottomSheetLayer },
  layout: 'background',
  data() {
    return {
      loading: false,
      error: false,
    }
  },
  async created() {
    await this.doLogout()
  },
  methods: {
    async doLogout(): Promise<void> {
      this.loading = true
      const { Auth } = withSSRContext()
      try {
        await Auth.signOut()
        await vxm.app.resetDate()
        await this.$router.push(this.localePath('/'))
      } catch {
        this.loading = false
        this.error = true
      }
    },
  },
})
</script>
