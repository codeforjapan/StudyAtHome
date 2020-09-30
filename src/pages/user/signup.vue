<template>
  <div>
    <base-bottom-sheet-layer
      :title="$t('pages.user_signup.title')"
      title-en="STEP 1"
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
            {{ $t('common.user_data.labels.password') }}
          </dt>
          <dt class="SignUp-Rules">
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
            {{ $t('pages.user_signup.labels.password_confirm') }}
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
            @click="$router.push('/')"
          />
          <base-action-button
            theme="primary"
            :text="$t('pages.user_signup.buttons.signup')"
            class="SignUp-Button"
            :is-disabled="disableRegisterButton"
            :is-loading="loading"
            @click="doSignUp"
          />
        </div>
      </template>
    </base-bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" top color="#C01B61">
      {{ $t('common.general.error.default') }}
    </v-snackbar>
    <v-dialog v-model="completion" max-width="460px">
      <v-card class="DialogCard">
        <v-container class="DialogCardContentContainer">
          {{ $t('pages.user_signup.success.message') }}
        </v-container>
        <v-card-actions class="DialogCardButtons px-4">
          <base-action-button
            :text="$t('pages.user_signup.success.go_back_to_top')"
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
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import BaseInputField from '@/components/BaseInputField.vue'
import { Auth } from 'aws-amplify'

export default Vue.extend({
  components: { BaseBottomSheetLayer, BaseActionButton, BaseInputField },
  layout: 'background',
  data() {
    return {
      name: '',
      email: '',
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
    async doSignUp(): Promise<void> {
      this.loading = true
      await Auth.signUp({
        username: this.email,
        password: this.password,
        attributes: {
          email: this.email,
          name: this.name,
        },
      })
        .then(() => {
          this.completion = true
          this.loading = false
          this.$router.push('/user/verify')
        })
        .catch(() => {
          this.error = true
          this.loading = false
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
