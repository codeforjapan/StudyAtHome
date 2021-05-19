<template>
  <div>
    <base-bottom-sheet-layer
      :title="$t('pages.user_edit_user_data.title')"
      title-en="USER SETTING"
    >
      <template #LayerContents>
        <dl>
          <dt class="SignUp-ItemTitle">
            {{ $t('common.user_data.labels.nickname') }}
          </dt>
          <dd class="SignUp-ItemButton">
            <v-btn
              block
              color="white"
              height="auto"
              class="ToEditNavButton"
              @click="$router.push('/user/editUserName')"
            >
              {{ name }}
              <v-icon right color="#0071C2"> mdi-chevron-right </v-icon>
            </v-btn>
          </dd>
          <dt class="SignUp-ItemTitle">
            {{ $t('common.user_data.labels.email') }}
          </dt>
          <dd class="SignUp-ItemButton">
            <v-btn
              block
              color="white"
              height="auto"
              class="ToEditNavButton"
              @click="$router.push('/user/editUserEmail')"
            >
              {{ email }}
              <v-icon right color="#0071C2"> mdi-chevron-right </v-icon>
            </v-btn>
          </dd>
          <dt class="SignUp-ItemTitle">
            {{ $t('common.user_data.labels.password') }}
          </dt>
          <dd class="SignUp-ItemButton">
            <v-btn
              block
              color="white"
              height="auto"
              class="ToEditNavButton"
              @click="$router.push('/user/editUserPassword')"
            >
              ********
              <v-icon right color="#0071C2"> mdi-chevron-right </v-icon>
            </v-btn>
          </dd>
        </dl>
      </template>
      <template #LayerFooter>
        <div class="SignUp-ButtonOuter">
          <base-action-button
            theme="transparent"
            :text="$t('common.general.buttons.cancel')"
            class="SignUp-Button"
            @click="$router.push('/edit')"
          />
          <v-btn
            :disabled="loading"
            class="LogoutButton"
            color="#fff"
            height="60px"
            text
            @click="doLogout"
          >
            {{ $t('common.general.buttons.logout') }}
            <v-icon right color="#fff"> mdi-logout-variant </v-icon>
          </v-btn>
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
import { vxm } from '~/store'

type Data = {
  name: typeof vxm.user.displayName
  email: typeof vxm.user.email
  error: boolean
  loading: boolean
}

type Methods = {
  doLogout(): void
}

type Computed = {
  passwordConfirm: string
  disableRegisterButton: boolean
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  components: { BaseBottomSheetLayer, BaseActionButton },
  layout: 'background',
  middleware: 'authenticated',
  data() {
    return {
      name: vxm.user.displayName,
      email: vxm.user.email,
      error: false,
      loading: false,
    }
  },
  async mounted() {
    await vxm.user.login()
    this.name = vxm.user.displayName
    this.email = vxm.user.email
  },
  methods: {
    async doLogout(): Promise<void> {
      try {
        await vxm.user.logout()
        await vxm.app.resetDate()
        await this.$router.push('/')
      } catch {
        this.error = true
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.ToEditNavButton {
  justify-content: space-between;
  font-size: 18px;
  border-radius: 14px;
  padding: 16px !important;
  text-transform: none;
}
.SignUp-ItemTitle {
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  margin: 4px 0;
}
.SignUp-ItemButton {
  margin-bottom: 24px;
}
.SignUp-ButtonOuter {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.SignUp-Button {
  width: 8em;
  margin-bottom: 16px;
}
.LogoutButton {
  font-size: 18px;
  font-weight: bold;
}
</style>
