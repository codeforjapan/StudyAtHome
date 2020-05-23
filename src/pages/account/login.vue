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
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :counter="32"
            label="Password"
            outlined
            dark
            prepend-icon="mdi-lock"
            @click:append="showPassword = !showPassword"
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

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import firebase from '@/plugins/firebase'
import Logo from '@/assets/svgs/logo.svg'

export type DataType = {
  email: string
  password: string
  showPassword: boolean
  loading: boolean
}

export default Vue.extend({
  components: {
    Logo
  },
  data(): DataType {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false
    }
  },
  methods: {
    doLogin(): void {
      this.loading = true
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(_userInfo => {
          vxm.user.login(/* _userInfo */)
        })
        .then(() => {
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
