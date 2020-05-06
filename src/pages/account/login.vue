<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  :counter="32"
                  label="email"
                  prepend-icon="mdi-email"
                />
                <v-text-field
                  v-model="password"
                  :append-icon="
                    show_password ? 'mdi-visibility' : 'mdi-visibility_off'
                  "
                  :type="show_password ? 'text' : 'password'"
                  :counter="32"
                  label="password"
                  prepend-icon="mdi-lock"
                  @click:append="show_password = !show_password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="gotoSignup">SIGNUP</v-btn>
              <v-spacer />
              <v-btn @click="doLogin">LOGIN</v-btn>
            </v-card-actions>
            <hr />
            <v-spacer />
            <v-btn @click="gotoResetPassword"
              >パスワードを忘れたかたはこちら</v-btn
            >
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
export default {
  data() {
    return {
      email: '',
      password: '',
      show_password: false,
    }
  },
  methods: {
    ...mapActions('modules/user', ['login']),
    doLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userInfo) => {
          this.login(userInfo)
        })
        .then(() => {
          this.$router.push('/edit')
        })
        .catch((error) => {
          alert(error)
        })
    },
    gotoSignup() {
      this.$router.push('/account/signup')
    },
    gotoResetPassword() {
      this.$router.push('/reset-password')
    },
  },
}
</script>
