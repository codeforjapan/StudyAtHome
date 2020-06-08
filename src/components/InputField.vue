<template>
  <v-text-field
    v-if="type === 'password'"
    v-model="value"
    :color="textFieldColor"
    :type="show ? 'text' : 'password'"
    :hint="hint"
    :label="label"
    background-color="white"
    class="elevation-0"
    solo
    flat
    outlined
  >
    <template v-slot:prepend-inner>
      <v-icon :color="prependIconColor">{{ prependIcon }}</v-icon>
    </template>
    <template v-slot:append>
      <v-icon
        color="blue"
        @click="show = !show"
        v-text="show ? 'mdi-eye' : 'mdi-eye-off'"
      />
    </template>
  </v-text-field>
  <v-text-field
    v-else-if="type === 'email'"
    v-model="value"
    :color="textFieldColor"
    type="text"
    :hint="hint"
    :label="label"
    background-color="white"
    class="elevation-0"
    solo
    flat
    outlined
  >
    <template v-slot:prepend-inner>
      <v-icon :color="prependIconColor">{{ prependIcon }}</v-icon>
    </template>
  </v-text-field>
  <v-text-field
    v-else-if="type === 'classId'"
    v-model="value"
    :color="textFieldColor"
    type="text"
    :hint="hint"
    :label="label"
    background-color="white"
    class="elevation-0"
    solo
    flat
    outlined
  >
    <template v-slot:prepend-inner>
      <v-icon :color="prependIconColor">{{ prependIcon }}</v-icon>
    </template>
  </v-text-field>
  <v-text-field
    v-else
    v-model="value"
    :color="textFieldColor"
    type="text"
    :hint="hint"
    :label="label"
    background-color="white"
    class="elevation-0"
    solo
    flat
    outlined
  >
    <template v-slot:prepend-inner>
      <v-icon :color="prependIconColor">{{ prependIcon }}</v-icon>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
type DataType = {
  value: string
  show: boolean
}
export default Vue.extend({
  name: 'InputField',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    hint: {
      type: String,
      required: false,
      default: ''
    },
    appendIcon: {
      type: String,
      required: false,
      default: ''
    },
    require: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(): DataType {
    return {
      show: false,
      value: ''
    }
  },
  computed: {
    prependIconColor(): string {
      const classIdPattern = /^[あ-ん]{6}$/
      if (this.type === 'classId') {
        if (!this.value || !classIdPattern.test(this.value)) return '#C01B61'
      }
      if (this.type === 'email') {
        if (
          !this.value ||
          !this.value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        )
          return '#C01B61'
      }
      if (this.require) {
        if (!this.value) return '#C01B61'
      }
      if (this.value) {
        return '#138945'
      }
      return '#BDBDBD'
    },
    textFieldColor(): string {
      const classIdPattern = /^[あ-ん]{6}$/
      if (this.type === 'classId') {
        if (!this.value || !classIdPattern.test(this.value)) return '#C01B61'
      }
      if (this.type === 'email') {
        if (
          !this.value ||
          !this.value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        )
          return '#C01B61'
      }
      if (this.require) {
        if (!this.value) return '#C01B61'
      }
      return '#0071C2'
    },
    prependIcon(): string {
      const classIdPattern = /^[あ-ん]{6}$/
      if (this.type === 'classId') {
        if (!this.value || !classIdPattern.test(this.value))
          return 'mdi-alert-circle'
      }
      if (this.type === 'email') {
        if (
          !this.value ||
          !this.value.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        )
          return 'mdi-alert-circle'
      }
      if (this.require) {
        if (!this.value) return 'mdi-alert-circle'
      }
      return 'mdi-check-circle'
    }
  },
  watch: {
    value(value) {
      this.$emit('input', value)
    }
  }
})
</script>

<style lang="scss">
.v-input__slot {
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
