<template>
  <div>
    <base-bottom-sheet-layer
      :title="$t('pages.user_edit_user_data.title')"
      title-en="USER SETTING"
      fullscreen
    >
      <template v-slot:LayerContents>
        <dl>
          <dt class="SignUp-ItemTitle">
            {{ $t('common.user_data.labels.nickname') }}
          </dt>
          <dd>
            <base-input-field
              v-model="name"
              label="name"
              placeholder="山田花子"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">
            {{ $t('common.user_data.labels.email') }}
          </dt>
          <dd>
            <base-input-field
              v-model="email"
              label="email"
              placeholder="hogehoge@hogehoge.com"
              type="email"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">
            {{ $t('pages.user_edit_user_data.labels.new_password') }}
          </dt>
          <dt class="SignUp-PasswordRules">
            {{ $t('common.user_data.labels.password_rules') }}
          </dt>
          <dd>
            <base-input-field
              v-model="password"
              label="password"
              type="password"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">
            {{ $t('pages.user_edit_user_data.labels.new_password_confirm') }}
          </dt>
          <dd>
            <base-input-field
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
          <base-action-button
            theme="transparent"
            :text="$t('common.general.buttons.cancel')"
            class="SignUp-Button"
            @click="$router.push('/edit')"
          />
          <base-action-button
            theme="primary"
            :text="$t('common.general.buttons.save')"
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
          <span>{{ $t('common.general.buttons.logout') }}</span>
        </v-btn>
      </template>
    </base-bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" top color="#C01B61">
      {{ $t('common.general.error.default') }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import BaseInputField from '@/components/BaseInputField.vue'
import { Auth } from 'aws-amplify'
import { vxm } from '~/store'

type Data = {
  name: typeof vxm.user.displayName
  email: typeof vxm.user.email
  password: string
  confirmation: string
  error: boolean
  completion: boolean
  loading: boolean
}

type Methods = {
  doSave(): void
  doLogout(): void
}

type Computed = {
  passwordConfirm: string
  disableRegisterButton: boolean
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  components: { BaseBottomSheetLayer, BaseActionButton, BaseInputField },
  layout: 'background',
  data() {
    return {
      name: vxm.user.displayName,
      email: vxm.user.email,
      password: '',
      confirmation: '',
      error: false,
      completion: false,
      loading: false,
    }
  },
  computed: {
    passwordConfirm() {
      if (this.password) {
        // 6文字以上であること
        const reg = new RegExp(/[ -~]{6,}$/)
        const response = reg.test(this.password)
        if (!response) {
          return this.$t(
            'common.user_data.labels.password_not_acceptable'
          ).toString()
        }
      }
      if (this.password && this.confirmation) {
        if (this.password !== this.confirmation) {
          return this.$t('common.user_data.labels.password_not_same').toString()
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
        const reg = new RegExp(/[ -~]{6,}$/)
        const response = reg.test(this.password)
        if (!response) {
          return true
        }
        return false
      }
      return true
    },
  },
  methods: {
    async doSave(): Promise<void> {
      this.loading = true
      const user = await Auth.currentAuthenticatedUser()
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
          // firebase
          //   .firestore()
          //   .collection('users')
          //   .doc(user.uid)
          //   .update({
          //     username: this.name,
          //   })
          //   .then(() => {
          //     vxm.user.login()
          //   })
          //   .catch(() => {
          //     this.error = true
          //     this.loading = false
          //   })
        }
        if (this.password) {
          // user
          //   .updatePassword(this.password)
          //   .then(() => {
          //     vxm.user.login()
          //   })
          //   .catch(() => {
          //     this.error = true
          //     this.loading = false
          //   })
        }
      }
      this.$router.push('/edit')
    },
    async doLogout(): Promise<void> {
      await Auth.signOut()
        .then(() => {
          vxm.user.logout()
          this.$router.push('/')
        })
        .catch(() => {
          this.error = true
        })
    },
  },
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
.SignUp-PasswordRules {
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
