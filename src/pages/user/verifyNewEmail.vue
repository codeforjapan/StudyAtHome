<template>
  <div>
    <base-bottom-sheet-layer
      fullscreen
      :title="$t('pages.user_verify_new_email.title')"
      title-en="VERIFY NEW EMAIL"
    >
      <template #LayerContents>
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
            {{ $t('common.user_data.labels.verification_code') }}
          </dt>
          <dd class="SignIn-Item">
            <base-input-field
              v-model="verification_code"
              :label="$t('common.user_data.labels.verification_code')"
              require
              type="number"
            />
          </dd>
        </dl>
      </template>
      <template #LayerFooter>
        <div class="SignIn-ButtonOuter">
          <base-action-button
            :is-disabled="disableLogin"
            :is-loading="loading"
            class="SignIn-Button"
            :text="$t('common.general.buttons.verify')"
            theme="primary"
            @click="doVerify"
          />
          <v-btn
            :disabled="loading"
            block
            class="button"
            color="#ffffff"
            height="60px"
            text
            :to="localePath('/')"
          >
            <span>{{ $t('common.general.buttons.go_back') }}</span>
          </v-btn>
        </div>
      </template>
    </base-bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" top color="#C01B61">
      {{ $t('pages.user_verify.error.invalid') }}
    </v-snackbar>
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
  middleware: 'authenticated',
  data() {
    return {
      email: '',
      verification_code: '',
      loading: false,
      error: false,
    }
  },
  computed: {
    disableVerify(): boolean {
      return !(
        this.email &&
        this.verification_code &&
        this.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
      )
    },
  },
  methods: {
    async doVerify(): Promise<void> {
      this.loading = true
      await Auth.verifyCurrentUserAttributeSubmit(
        'email',
        this.verification_code
      )
        .then(() => {
          this.$router.push(this.localePath('/user/editUserData'))
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
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
