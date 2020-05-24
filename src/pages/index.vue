<template>
  <div class="LoginPage">
    <v-flex>
      <div class="Logo">
        <Logo style="height: 80vw; max-height: 350px; width: 100%;" />
      </div>
      {{ errorMessages }}
      <div class="LoginForm">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="classId"
            :counter="6"
            label="クラスID"
            :rules="nameRules"
            outlined
            dark
            required
          />
          <v-btn
            block
            outlined
            color="white"
            height="40px"
            :loading="loading"
            :disabled="loading || !valid"
            @click="loginToClass"
          >
            LOGIN
          </v-btn>
        </v-form>
      </div>
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import Logo from '@/assets/svgs/logo.svg'

type DataType = {
  classId: string
  loading: boolean
  error: boolean
  errorMessages: string
  valid: boolean
  nameRules: ((v: string) => boolean | string)[]
}

export default Vue.extend({
  components: { Logo },
  data(): DataType {
    return {
      classId: '',
      loading: false,
      error: false,
      errorMessages: '',
      valid: true,
      nameRules: [
        v => !!v || 'クラスIDは必須です',
        v => (v && v.length === 6) || 'クラスIDは6文字のひらがなです'
      ]
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
.MainPage {
  .Logo {
    text-align: center;
  }
  .DataBlock {
    margin: 0 -12px;
    .studycard {
      margin-bottom: 20px;
    }
  }
}
</style>
