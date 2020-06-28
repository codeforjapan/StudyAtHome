<template>
  <div>
    <bottom-sheet-layer title="ユーザー登録" title-en="STEP 1" fullscreen>
      <template v-slot:LayerContents>
        <dl>
          <dt class="SignUp-ItemTitle">お名前（表示名）</dt>
          <dd>
            <input-field
              v-model="name"
              label="name"
              placeholder="山田花子"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">メールアドレス</dt>
          <dd>
            <input-field
              v-model="email"
              label="email"
              placeholder="hogehoge@hogehoge.com"
              type="email"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">パスワード</dt>
          <dt class="SignUp-Rules">
            パスワードは8文字以上で、アルファベットと数字を含めてください
          </dt>
          <dd>
            <input-field
              v-model="password"
              label="password"
              type="password"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">パスワード（確認用）</dt>
          <dd>
            <input-field
              v-model="confirmation"
              label="confirmation"
              type="password"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle text--red">{{ passwordConfirm }}</dt>
        </dl>
      </template>
      <template v-slot:LayerFooter>
        <div class="SignUp-ButtonOuter">
          <action-button
            theme="transparent"
            text="キャンセル"
            class="SignUp-Button"
            @click="$router.push('/')"
          />
          <action-button
            theme="primary"
            text="登録"
            class="SignUp-Button"
            :is-disabled="disableRegisterButton"
            :is-loading="loading"
            @click="doSignUp"
          />
        </div>
      </template>
    </bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" absolute top color="#C01B61">
      何らかのエラーが発生しました。時間をおいて再度お試しください。
    </v-snackbar>
    <v-dialog v-model="completion" max-width="460px">
      <v-card class="DialogCard">
        <v-container class="DialogCardContentContainer">
          入力いただいたメールアドレス宛に確認メールを送信しました。<br />
          メールに記載されているURLから認証を行ってください。
        </v-container>
        <v-card-actions class="DialogCardButtons px-4">
          <action-button
            text="トップに戻る"
            theme="border"
            class="my-3"
            @click="$router.push('/')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomSheetLayer from '@/components/BottomSheetLayer.vue'
import ActionButton from '@/components/ActionButton.vue'
import InputField from '@/components/InputField.vue'
import firebase from '@/plugins/firebase'

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton, InputField },
  layout: 'background',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmation: '',
      error: false,
      completion: false,
      loading: false
    }
  },
  computed: {
    passwordConfirm() {
      if (this.password) {
        // 8文字以上であること
        // 英数字が混在していること
        const reg = new RegExp(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i)
        const response = reg.test(this.password)
        if (!response) {
          return 'パスワードが条件を満たしていません'
        }
      }
      if (this.password && this.confirmation) {
        if (this.password !== this.confirmation) {
          return 'パスワードが一致していません'
        }
        return ''
      }
      return ''
    },
    disableRegisterButton() {
      if (this.password && this.confirmation && this.email && this.name) {
        if (this.password !== this.confirmation) {
          return true
        }
        const reg = new RegExp(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i)
        const response = reg.test(this.password)
        if (!response) {
          return true
        }
        return false
      }
      return true
    }
  },
  methods: {
    doSignUp(): void {
      this.loading = true
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          const user = firebase.auth().currentUser
          if (user) {
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set({
                username: this.name,
                allow_access: [],
                created_at: new Date(),
                last_login: new Date(),
                updated_at: new Date()
              })
              .catch(() => {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(user.uid)
                  .set({
                    username: this.name,
                    allow_access: [],
                    created_at: new Date(),
                    last_login: new Date(),
                    updated_at: new Date()
                  })
              })
            user.sendEmailVerification()
            this.completion = true
            this.loading = false
          }
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.SignUp-ItemTitle {
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  margin: 4px 0;
}
.SignUp-Rules {
  text-align: center;
  font-weight: bold;
  color: $color-yellow;
}
.SignUp-ButtonOuter {
  display: flex;
  justify-content: space-between;
}
.SignUp-Button {
  flex: 0 1 48%;
}
.Dialog {
  margin: auto !important;
}
.v-dialog {
  .DialogCard {
    border-radius: 14px;

    &Title,
    &Buttons {
      flex-direction: column;
    }

    &Title,
    &TitleIcon {
      color: $color-base-color-01;
      font-size: 16px;
    }
  }
}
</style>
