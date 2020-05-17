<template>
  <div class="SignUpPage">
    <v-flex>
      <div class="Logo">
        <Logo style="height: 80vw; max-height: 350px; width: 100%;" />
      </div>
      <div class="SignUpForm">
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
            @click="doSignup"
          >
            SIGNUP
          </v-btn>
        </v-form>
      </div>
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import Logo from '@/assets/svgs/logo.svg'

type DataType = {
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
    ...mapActions('modules/user', ['login']),
    doSignup(): void {
      this.loading = true
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async userInfo => {
          if (userInfo.user !== null) {
            this.login(userInfo)
            await this.writeUserData(userInfo.user.uid)
          }
        })
        .then(() => {
          this.$router.push('/edit')
        })
        .catch(error => {
          this.loading = false
          alert(error)
        })
    },
    writeUserData(userId: string): Promise<void> {
      const today = new Date()
      return firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .set({
          allow_access: [],
          created_at: today,
          updated_at: today,
          last_login: today
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.SignUpPage {
  text-align: center;
  .Logo {
    text-align: center;
  }
  .SignUpTitle {
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
  .SignUpForm {
    width: 90%;
    max-width: 600px;
    margin: 50px auto;
  }
}
</style>
