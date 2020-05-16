<template>
  <div class="LoginPage">
    <v-flex>
      <div class="Logo">
        <Logo style="height: 80vw; max-height: 350px; width: 100%;" />
      </div>
      <div class="LoginForm">
        <v-form>
          <v-text-field
            v-model="email"
            :counter="32"
            label="email"
            outlined
            dark
            prepend-icon="mdi-email"
          />
          <v-text-field
            v-model="password"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            :counter="32"
            label="Password"
            outlined
            dark
            prepend-icon="mdi-lock"
            @click:append="show_password = !show_password"
          />
          <v-btn
            block
            outlined
            color="white"
            height="40px"
            :loading="loading"
            :disabled="loading"
            @click="doLogin"
          >
            LOGIN
          </v-btn>
        </v-form>
      </div>
    </v-flex>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Logo from '@/assets/svgs/logo.svg'

export default {
  components: {
    Logo
  },
  data() {
    return {
      email: '',
      password: '',
      show_password: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('modules/user', ['login']),
    doLogin() {
      this.loading = true
      this.$fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(userInfo => {
          this.login(userInfo)
        })
        .then(() => {
          this.$router.push('/edit')
        })
        .catch(error => {
          this.loading = false
          alert(error)
        })
    },
    gotoSignup() {
      this.$router.push('/account/signup')
    },
    gotoResetPassword() {
      this.$router.push('/reset-password')
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginPage {
  text-align: center;
  .Logo {
    text-align: center;
  }
  .LoginTitle {
    color: #fff;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 5em;
  }
  .DataBlock {
    margin: 0 -12px;
    .studycard {
      margin-bottom: 20px;
    }
  }
  .LoginForm {
    width: 90%;
    max-width: 600px;
    margin: 50px auto;
  }
}
</style>
