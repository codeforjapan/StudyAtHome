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
          <v-btn
            block
            outlined
            color="white"
            height="40px"
            :loading="loading"
            :disabled="loading"
            @click="doResetPassword"
          >
            再設定メールを送信する
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

export type DataType = {
  email: string
  loading: boolean
}

export default Vue.extend({
  components: {
    Logo
  },
  data(): DataType {
    return {
      email: '',
      loading: false
    }
  },
  methods: {
    ...mapActions('modules/user', ['login']),
    doResetPassword(): void {
      this.loading = true
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.$router.push('/account/signin')
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
