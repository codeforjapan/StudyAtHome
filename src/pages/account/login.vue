<template>
  <div>
    <bottom-sheet-layer
      fullscreen
      title="ログインしてください"
      title-en="LOGIN"
    >
      <template v-slot:LayerContents>
        <dl>
          <dt class="SignIn-ItemTitle">メールアドレス</dt>
          <dd class="SignIn-Item">
            <input-field
              v-model="email"
              label="studyathome@example.com"
              require
              type="email"
            />
          </dd>
          <dt class="SignIn-ItemTitle">パスワード</dt>
          <dd class="SignIn-Item">
            <input-field
              v-model="password"
              label="パスワード"
              require
              type="password"
            />
          </dd>
        </dl>
      </template>
      <template v-slot:LayerFooter>
        <div class="SignIn-ButtonOuter">
          <action-button
            :is-disabled="disableLogin"
            :is-loading="loading"
            class="SignIn-Button"
            text="ログイン"
            theme="primary"
            @click="doLogin"
          />
          <v-btn
            :disabled="loading"
            block
            class="button"
            color="#ffffff"
            height="60px"
            text
            to="/"
          >
            <span>パスワードを忘れた方へ</span>
          </v-btn>
        </div>
      </template>
    </bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" absolute top color="#C01B61">
      メールアドレスまたはパスワードが正しくありません
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomSheetLayer from '@/components/BottomSheetLayer.vue'
import ActionButton from '@/components/ActionButton.vue'
import InputField from '@/components/InputField.vue'
import firebase from '@/plugins/firebase'
import { vxm } from '~/store'

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton, InputField },
  layout: 'background',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: false
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
        .catch(() => {
          this.loading = false
          this.error = true
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.SignIn-ItemTitle {
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  margin: 4px 0;
}
.SignIn-Item {
  margin: 20px 0;
}
.SignIn-ButtonOuter {
  justify-content: space-between;
}
.SignIn-Button {
  flex: 0 1 48%;
}
</style>
