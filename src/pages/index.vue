<template>
  <v-layout justify-center="true" align-center="true">
    <v-flex class="indexFlex">
      <v-row justify="center" class="mb-3">
        <v-icon color="white" size="60px">mdi-library</v-icon>
      </v-row>
      <v-row justify="center">
        <span class="description mb-3">
          {{ $t('pages.index.students.label') }}
        </span>
      </v-row>
      <v-row class="loginFieldRow" justify="center">
        <base-input-field
          v-model="classId"
          class="classIdField"
          type="classId"
          :label="$t('pages.index.students.class_id')"
        />
        <v-btn
          class="classLoginButton ml-3"
          color="#FFDB6C"
          width="56px"
          height="56px"
          :disabled="!/^[あ-ん]{6}$/.test(classId)"
          :loading="loading"
          @click="loginToClass"
        >
          <v-icon color="black">mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-row>
      <v-flex fill-width justify="center" class="forTeachers">
        <v-row class="mt-10 mb-3" justify="center">
          <v-icon color="white" size="60px">mdi-account-circle</v-icon>
        </v-row>
        <v-row justify="center">
          <span class="description mb-3">
            {{ $t('pages.index.teachers.label') }}
          </span>
        </v-row>
        <div style="margin: 0 10px;">
          <base-action-button
            :text="$t('pages.index.teachers.buttons.signup')"
            class="registerButton"
            @click="$router.push('/user/terms')"
          />

          <base-action-button
            :text="$t('pages.index.teachers.buttons.login')"
            class="loginButton"
            theme="secondary"
            @click="$router.push('/user/login')"
          />
          <v-footer color="#004170" padless>
            <ul class="Index-Footer-List">
              <li>
                <a
                  class="white--text"
                  href="http://www.studyathome.jp/"
                  target="_blank"
                  rel="noopener"
                >
                  {{ $t('common.footer.about') }}
                </a>
              </li>
              <li>
                <a
                  class="white--text"
                  href="https://forms.gle/G91PJ7T8ipTtYeGA6"
                  target="_blank"
                  rel="noopener"
                >
                  {{ $t('common.footer.contact') }}
                </a>
              </li>

              <li>
                <nuxt-link class="white--text" to="policy">
                  {{ $t('common.footer.terms') }}
                </nuxt-link>
              </li>
            </ul>
          </v-footer>
        </div>
      </v-flex>
    </v-flex>
    <v-snackbar v-model="error" :timeout="5000" absolute top color="#C01B61">
      {{ $t('pages.index.error.invalid_class_id') }}
    </v-snackbar>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import BaseInputField from '@/components/BaseInputField.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'

type DataType = {
  classId: string
  loading: boolean
  error: boolean
  valid: boolean
}

export default Vue.extend({
  components: {
    BaseActionButton,
    BaseInputField,
  },
  data(): DataType {
    return {
      classId: '',
      loading: false,
      error: false,
      valid: true,
    }
  },
  methods: {
    loginToClass(): void {
      this.loading = true
      vxm.classData
        .loadClassData(this.classId)
        .then(() => {
          this.$router.push('/classes')
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
.classLoginButton {
  border-radius: 14px;
  min-width: 48px !important;
}
.description {
  color: white;
  font-weight: bold;
  font-family: 'Noto Sans JP', sans-serif;
}
.forTeachers {
  background-color: $color-base-color-07;
  border-radius: 24px 24px 24px 24px;
  padding-top: 4px;
  padding-bottom: 24px;
}
.indexFlex {
  max-width: 640px !important;
}
.loginFieldRow {
  margin-left: auto !important;
  margin-right: auto !important;
}
.loginButton {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 15px;
}
.registerButton {
  font-size: 16px;
  font-weight: bold;
}
.Index-Footer-List {
  margin: 15px auto 0 auto;
  font-size: 12px;
  color: $color-white;
  text-align: center;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 12px;

    &::before {
      content: '-';
      padding-right: 8px;
    }
  }
}
</style>
