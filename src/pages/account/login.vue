<template>
  <v-bottom-sheet
    v-model="sheet"
    class="sheet"
    fullscreen
    hide-overlay
    persistent
    scrollable
  >
    <v-card class="card">
      <v-card-title class="card-title" />
      <v-card-text class="card-text">
        <v-container class="container">
          <v-layout align-center="true" column>
            <v-row>
              <h2 class="english-title">
                LOGIN
              </h2>
            </v-row>
            <v-row>
              <h1 class="japanese-title">
                ログインしてください
              </h1>
            </v-row>
            <div class="divider" />
            <v-row class="row-input">
              <h3 class="input-title">
                メールアドレス
              </h3>
              <InputField
                v-model="email"
                class="input-field"
                label="メールアドレス"
                require
                type="email"
              />
            </v-row>
            <v-row class="row-input">
              <h3 class="input-title">
                パスワード
              </h3>
              <InputField
                v-model="password"
                class="input-field"
                label="パスワード"
                require
                type="password"
              />
            </v-row>

            <v-row class="row-input">
              <v-btn
                :disabled="disableLogin"
                :loading="loading"
                block
                class="button"
                color="#FFDB6C"
                height="60px"
                rounded
                @click="doLogin"
              >
                ログインする
              </v-btn>
            </v-row>
            <v-row class="row">
              <v-btn
                :disabled="loading"
                block
                class="button"
                color="#ffffff"
                height="60px"
                text
                to="/"
              >
                パスワードを忘れた方へ
              </v-btn>
            </v-row>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '~/plugins/firebase'
import { vxm } from '~/store'
import InputField from '@/components/InputField.vue'

export type DataType = {
  email: string
  password: string
  loading: boolean
  sheet: boolean
}

export default Vue.extend({
  components: {
    InputField
  },
  data(): DataType {
    return {
      email: '',
      password: '',
      loading: false,
      sheet: true
    }
  },
  computed: {
    disableLogin(): boolean {
      return !(
        this.email &&
        this.password &&
        this.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
      )
    }
  },
  methods: {
    doLogin(): void {
      this.loading = true
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          vxm.user.login()
          this.$router.push('/edit')
        })
        .catch(error => {
          this.loading = false
          alert(error)
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.sheet {
  margin-top: 40px !important;
}
.card {
  background-color: $color-base-color-07;
  border-radius: 24px 24px 0 0 !important;
}

.card-title {
  padding: 8px !important;
}
.card-text {
  padding: 0 !important;
}

.container {
  padding: 0 16px 16px;
}

.row {
  margin: 0;
  padding: 0;
}

.row-input {
  padding: 0;
  width: 100%;
  max-width: 640px;
  margin: 10px 0 20px 0;
}

.col {
  padding: 0;
}

.message {
  align-self: center;
  color: $color-white !important;
}

.add-button {
  align-self: start;
  float: right;
}
.english-title {
  color: $color-white;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  margin: 10px auto;
}
.japanese-title {
  color: $color-white;
  font-weight: bold;
  font-size: 20px;
  line-height: 34px;
}
.input-title {
  color: $color-white;
  font-weight: bold;
  font-size: 15px;
  line-height: 34px;
  margin: 0 auto;
}
.divider {
  width: 90vw;
  margin: 10px 0 20px 0;
  border: 0.5px solid $color-base-color-01;
}
.input-field {
  width: 100%;
}
.button {
  font-size: 16px;
  font-weight: bold;
}
</style>
