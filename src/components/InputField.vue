<template>
  <v-text-field
    v-if="type === 'password'"
    v-model="value"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    :label="label"
    background-color="white"
    error="true"
    solo
    flat
    outlined
    @click:append="show = !show"
  />
  <v-text-field
    v-else-if="type === 'email'"
    v-model="value"
    type="text"
    :label="label"
    background-color="white"
    solo
    flat
    outlined
    @click:append="show = !show"
  />
  <v-text-field
    v-else-if="type === 'classId'"
    v-model="value"
    type="text"
    :label="label"
    background-color="white"
    solo
    flat
    outlined
    @click:append="show = !show"
    rules="classIdRules"
  />
  <v-text-field
    v-else
    v-model="value"
    type="text"
    :label="label"
    background-color="white"
    solo
    flat
    outlined
    @click:append="show = !show"
  />
</template>

<script>
export default {
  name: 'InputField',
  props: {
    type: {
      type: String,
      require: false,
      default: 'text'
    },
    label: {
      type: String,
      require: true,
      default: ''
    },
    hint: {
      type: String,
      require: false,
      default: ''
    },
    append_icon: {
      type: String,
      require: false,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      value: '',
      classIdRule: [
        v => !!v || 'クラスIDは必須です',
        v => (v && v.length === 6) || 'クラスIDは6文字のひらがなです'
      ],
      passwordRule: [
        v => !!v || 'クラスIDは必須です',
        v => (v && v.length === 6) || 'クラスIDは6文字のひらがなです'
      ],

    }
  }
}
</script>
