<template>
  <div class="LauguageSelector">
    <v-select
      :value="$root.$i18n.locale"
      :items="locales"
      class="LauguageSelector-Menu"
      dense
      hide-details
      solo
      @input="$root.$i18n.setLocale($event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type LocaleListItem = { text: string; value: string }
type LocalData = {
  locales: LocaleListItem[]
}

export default Vue.extend({
  data(): LocalData {
    // const locales: LocaleListItem[] = []
    if (!this.$root.$i18n.locales)
      return { locales: [{ text: 'N/A', value: '' }] }

    return {
      locales: this.$root.$i18n.locales.map(l => {
        if (typeof l === 'string') return { text: l, value: l }
        else return { text: l.displayName, value: l.code }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.LauguageSelector-Menu {
  width: 8rem;
  margin: 0 2rem;
  padding: 0.2rem 0;
}
</style>
