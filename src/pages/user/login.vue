<template>
  <div>
    <base-bottom-sheet-layer
      fullscreen
      :title="$t('pages.user_login.title')"
      title-en="LOGIN"
    >
      <template v-slot:LayerContents>
        <dl>
          <dt class="SignIn-ItemTitle">
            {{ $t('common.user_data.labels.email') }}
          </dt>
          <dd class="SignIn-Item">
            <base-input-field
              v-model="email"
              label="studyathome@example.com"
              require
              type="email"
            />
          </dd>
          <dt class="SignIn-ItemTitle">
            {{ $t('common.user_data.labels.password') }}
          </dt>
          <dd class="SignIn-Item">
            <base-input-field
              v-model="password"
              :label="$t('common.user_data.labels.password')"
              require
              type="password"
            />
          </dd>
        </dl>
      </template>
      <template v-slot:LayerFooter>
        <div class="SignIn-ButtonOuter">
          <base-action-button
            :is-disabled="disableLogin"
            :is-loading="loading"
            class="SignIn-Button"
            :text="$t('common.general.buttons.login')"
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
            <span>{{ $t('common.general.buttons.go_back') }}</span>
          </v-btn>
        </div>
      </template>
    </base-bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" top color="#C01B61">
      {{ $t('pages.user_login.error.invalid') }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import BaseInputField from '@/components/BaseInputField.vue'
import { Auth } from 'aws-amplify'
// import { vxm } from '@/store'

export default Vue.extend({
  components: { BaseBottomSheetLayer, BaseActionButton, BaseInputField },
  layout: 'background',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: false,
    }
  },
  computed: {
    disableLogin(): boolean {
      return !(
        this.email &&
        this.password &&
        this.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
      )
    },
  },
  methods: {
    async doLogin(): Promise<void> {
      this.loading = true
      try {
        await Auth.signIn(this.email, this.password)
        // await vxm.user.login()
        await this.$router.push('/user/classlist')
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
  },
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
