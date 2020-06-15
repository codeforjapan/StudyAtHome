<template>
  <div>
    <bottom-sheet-layer
      title="ユーザー情報の変更"
      title-en="USER SETTING"
      fullscreen
    >
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
          <dt class="SignUp-ItemTitle">変更先パスワード</dt>
          <dd>
            <input-field
              v-model="password"
              label="password"
              type="password"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">変更先パスワード（確認用）</dt>
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
            @click="$router.push('/edit')"
          />
          <action-button
            theme="primary"
            text="保存"
            class="SignUp-Button"
            :is-disabled="disableRegisterButton"
            :is-loading="loading"
            @click="doSave"
          />
        </div>
        <v-btn
          :disabled="loading"
          block
          class="button"
          color="#ffffff"
          height="60px"
          text
          @click="doLogout"
        >
          <span>ログアウト</span>
        </v-btn>
      </template>
    </bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" absolute top color="#C01B61">
      何らかのエラーが発生しました。時間をおいて再度お試しください。
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
      name: vxm.user.displayName,
      email: vxm.user.email,
      password: '',
      confirmation: '',
      error: false,
      completion: false,
      loading: false
    }
  },
  computed: {
    passwordConfirm() {
      if (this.password && this.confirmation) {
        if (this.password !== this.confirmation) {
          return 'パスワードが一致していません'
        }
        return ''
      }
      return ''
    },
    disableRegisterButton() {
      if (this.email && this.name) {
        if (this.password !== this.confirmation) {
          return true
        }
        return false
      }
      return true
    }
  },
  methods: {
    doSave(): void {
      this.loading = true
      const user = firebase.auth().currentUser
      if (user) {
        if (this.email !== vxm.user.email) {
          if (this.email) {
            user
              .updateEmail(this.email)
              .then(() => {
                vxm.user.login()
              })
              .catch(() => {
                this.error = true
                this.loading = false
              })
          }
        }
        if (this.name !== vxm.user.displayName) {
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              username: this.name
            })
            .then(() => {
              vxm.user.login()
            })
            .catch(() => {
              this.error = true
              this.loading = false
            })
        }
        if (this.password) {
          user
            .updatePassword(this.password)
            .then(() => {
              vxm.user.login()
            })
            .catch(() => {
              this.error = true
              this.loading = false
            })
        }
      }
      this.$router.push('edit')
    },
    doLogout(): void {
      firebase
        .auth()
        .signOut()
        .then(() => {
          vxm.user.logout()
          this.$router.push('/')
        })
        .catch(() => {
          this.error = true
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
