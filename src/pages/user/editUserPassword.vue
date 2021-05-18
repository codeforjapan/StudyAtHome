<template>
  <div>
    <base-bottom-sheet-layer
      :title="$t('pages.user_edit_user_password.title')"
      title-en="USER SETTING"
    >
      <template v-slot:LayerContents>
        <dl>
          <dt class="SignUp-ItemTitle">
            {{ $t('pages.user_edit_user_password.labels.current_password') }}
          </dt>
          <dd>
            <base-input-field
              v-model="currentPassword"
              :placeholder="$t('common.user_data.labels.password')"
              type="password"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">
            {{ $t('pages.user_edit_user_password.labels.new_password') }}
          </dt>
          <dd class="SignUp-PasswordRules">
            {{ $t('common.user_data.labels.password_rules') }}
          </dd>
          <dd>
            <base-input-field
              v-model="newPassword"
              :placeholder="$t('common.user_data.labels.password')"
              type="password"
              require
            />
          </dd>
          <dt class="SignUp-ItemTitle">
            {{
              $t('pages.user_edit_user_password.labels.new_password_confirm')
            }}
          </dt>
          <dd>
            <base-input-field
              v-model="confirmation"
              :placeholder="$t('common.user_data.labels.password')"
              type="password"
              require
            />
          </dd>
          <dd class="SignUp-ConfirmMessage">{{ passwordConfirm }}</dd>
        </dl>
      </template>
      <template v-slot:LayerFooter>
        <div class="SignUp-ButtonOuter">
          <base-action-button
            theme="transparent"
            :text="$t('common.general.buttons.cancel')"
            class="SignUp-Button"
            @click="$router.push('/user/editUserData')"
          />
          <base-action-button
            theme="primary"
            :text="$t('common.general.buttons.change')"
            class="SignUp-Button"
            :is-disabled="disableRegisterButton"
            :is-loading="loading"
            @click="doSave"
          />
        </div>
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

type Data = {
  currentPassword: string
  newPassword: string
  confirmation: string
  error: boolean
  loading: boolean
}

type Methods = {
  doSave(): void
}

type Computed = {
  passwordConfirm: string
  disableRegisterButton: boolean
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  components: { BaseBottomSheetLayer, BaseActionButton, BaseInputField },
  layout: 'background',
  middleware: 'authenticated',
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmation: '',
      error: false,
      loading: false,
    }
  },
  computed: {
    passwordConfirm() {
      if (this.newPassword) {
        // 6文字以上であること
        const reg = new RegExp(/[ -~]{6,}$/)
        const response = reg.test(this.newPassword)
        if (!response) {
          return this.$t(
            'common.user_data.labels.password_not_acceptable'
          ).toString()
        }
      }
      if (this.newPassword && this.confirmation) {
        if (this.newPassword !== this.confirmation) {
          return this.$t('common.user_data.labels.password_not_same').toString()
        }
        return ''
      }
      return ''
    },
    disableRegisterButton() {
      if (this.currentPassword && this.newPassword === this.confirmation) {
        const reg = new RegExp(/[ -~]{6,}$/)
        const response = reg.test(this.newPassword)
        if (response) {
          return false
        }
      }
      return true
    },
  },
  methods: {
    async doSave(): Promise<void> {
      this.loading = true
      const user = await Auth.currentAuthenticatedUser()
      if (user) {
        if (this.newPassword) {
          try {
            await Auth.changePassword(
              user,
              this.currentPassword,
              this.newPassword
            )
            await this.$router.push('/user/editUserData')
          } catch {
            this.error = true
            this.loading = false
          }
        }
      }
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
.SignUp-ConfirmMessage:not(:empty) {
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  background-color: $color-pink;
  border: 2px solid currentColor;
  border-radius: 10px;
  padding: 12px;
  text-align: center;
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
