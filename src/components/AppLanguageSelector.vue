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

type LocaleListItem = { text: string; value: string; format: string }
type LocalData = {
  locales: LocaleListItem[]
}

export default Vue.extend({
  data(): LocalData {
    if (!this.$root.$i18n.locales)
      return { locales: [{ text: 'N/A', value: '', format: '' }] }

    return {
      // @ts-ignore
      locales: this.$root.$i18n.locales.map((l) => {
        if (typeof l === 'string') return { text: l, value: l, format: l }
        else return { text: l.displayName, value: l.code, format: l.format }
      }),
    }
  },
  watch: {
    '$root.$i18n.locale'(locale) {
      this.$dayjs.locale(this.locales?.find((v) => v.value === locale)?.format)
    },
  },
})
</script>

<style lang="scss" scoped>
.LauguageSelector-Menu {
  width: 8rem;
  margin: 0 2rem;
  padding: 0.2rem 0;
}
</style>
