<template>
  <div>
    <base-bottom-sheet-layer
      :title="$t('pages.user_edit_user_name.title')"
      title-en="USER SETTING"
    >
      <template v-slot:LayerContents>
        <dl>
          <dt class="SignUp-ItemTitle">
            {{ $t('pages.user_edit_user_name.labels.current_nickname') }}
          </dt>
          <dd class="SignUp-ItemDisplay">
            {{ currentName }}
          </dd>
          <dt class="SignUp-ItemTitle">
            {{ $t('pages.user_edit_user_name.labels.new_nickname') }}
          </dt>
          <dd>
            <base-input-field
              v-model="name"
              label="name"
              :placeholder="$t('common.user_data.labels.nickname')"
              require
            />
          </dd>
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
import { vxm } from '~/store'

type Data = {
  currentName: typeof vxm.user.displayName
  name: string
  error: boolean
  loading: boolean
}

type Methods = {
  doSave(): void
}

type Computed = {
  disableRegisterButton: boolean
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  components: { BaseBottomSheetLayer, BaseActionButton, BaseInputField },
  layout: 'background',
  middleware: 'authenticated',
  data() {
    return {
      currentName: vxm.user.displayName,
      name: '',
      error: false,
      loading: false,
    }
  },
  computed: {
    disableRegisterButton() {
      return !this.name
    },
  },
  methods: {
    async doSave(): Promise<void> {
      this.loading = true
      const user = await Auth.currentAuthenticatedUser()
      if (user) {
        if (this.name !== this.currentName) {
          try {
            await Auth.updateUserAttributes(user, {
              name: this.name,
            })
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
.SignUp-ItemDisplay {
  font-size: 18px;
  color: $color-white;
  text-align: center;
  padding: 18px;
  margin-bottom: 24px;
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
