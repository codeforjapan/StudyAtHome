<template>
  <div>
    <base-bottom-sheet-layer
      :title="$t('pages.user_signup.title')"
      title-en="STEP 1"
      fullscreen
    >
      <template #LayerContents>
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
          <dt class="SignUp-ItemTitle text--red">
            {{ passwordConfirm }}
          </dt>
        </dl>
      </template>
      <template #LayerFooter>
        <div class="SignUp-ButtonOuter">
          <base-action-button
            theme="transparent"
            :text="$t('common.general.buttons.cancel')"
            class="SignUp-Button"
            @click="$router.push(localePath('/'))"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import BaseInputField from '@/components/BaseInputField.vue'
import { withSSRContext } from 'aws-amplify'

type Data = {
  name: string
  email: string
  password: string
  confirmation: string
  error: boolean
  completion: boolean
  loading: boolean
}

type Methods = {
  doSignUp(): Promise<void>
}

type Computed = {
  passwordConfirm: string
  disableRegisterButton: boolean
}

type Props = {}

export default Vue.extend<Data, Methods, Computed, Props>({
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
        const reg = /[ -~]{6,}$/
        const response = reg.test(this.password)
        if (!response) {
          return this.$tc('common.user_data.labels.password_not_acceptable')
        }
      }
      if (this.password && this.confirmation) {
        if (this.password !== this.confirmation) {
          return this.$tc('common.user_data.labels.password_not_same')
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
        const reg = /[ -~]{6,}$/
        const response = reg.test(this.password)
        return !response
      }
      return true
    },
  },
  methods: {
    async doSignUp() {
      this.loading = true
      const { Auth } = withSSRContext()
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
          this.$router.push(
            this.localePath({
              name: 'user-verify',
              params: { email: this.email },
            })
          )
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
