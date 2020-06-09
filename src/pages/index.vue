<template>
  <v-layout justify-center="true" align-center="true">
    <v-flex style="max-width: 630px !important;">
      <v-row justify="center" class="mb-3">
        <v-icon color="white" size="60px">mdi-library</v-icon>
      </v-row>
      <v-row justify="center">
        <span class="description mb-3">授業をうける生徒・児童の方</span>
      </v-row>
      <v-row
        justify="center"
        style="margin-left: auto !important; margin-right: auto !important;"
      >
        <input-field
          v-model="classId"
          class="classIdField"
          type="classId"
          label="クラスID"
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
          <span class="description mb-3">時間割をつくる先生方</span>
        </v-row>
        <div style="margin: 0 10px;">
          <v-btn
            color="#FFDB6C"
            height="60px"
            style="font-size: 16px; font-weight: bold;"
            block
            rounded
          >
            ユーザー登録する
          </v-btn>

          <v-btn
            color="white"
            height="50px"
            style="font-size: 16px; font-weight: bold; margin-top: 10px;"
            block
            rounded
          >
            ログインする
          </v-btn>
          <v-footer padless color="#004170" style="margin-top: 15px;">
            <v-row justify="center" no-gutters>
              <v-col
                class="white--text text-center md-16"
                cols="12"
                style="margin-top: 15px; font-size: 12px;"
              >
                <a class="white--text"> - おうちで時間割について </a>
              </v-col>
              <v-col
                class="white--text text-center"
                cols="12"
                style="margin-top: 15px; font-size: 12px;"
              >
                <a class="white--text"> - お問い合わせ </a>
              </v-col>
              <v-col
                class="white--text text-center"
                cols="12"
                style="margin-top: 15px; font-size: 12px;"
              >
                <a class="white--text"> - サイトポリシー </a>
              </v-col>
            </v-row>
          </v-footer>
        </div>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import InputField from '@/components/InputField.vue'

type DataType = {
  classId: string
  loading: boolean
  error: boolean
  errorMessages: string
  valid: boolean
}

export default Vue.extend({
  components: {
    InputField
  },
  data(): DataType {
    return {
      classId: '',
      loading: false,
      error: false,
      errorMessages: '',
      valid: true
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
        .catch((e: Error) => {
          this.loading = false
          this.error = true
          this.errorMessages = e.message
        })
    }
  }
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
</style>
