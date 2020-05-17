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
            @click="checkInClass"
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
import { mapActions } from 'vuex'
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
    ...mapActions('modules/class', ['loadClassData']),
    checkInClass(): void {
      this.loading = true
      this.checkExistsClassData(this.classId).then(value => {
        if (value) {
          this.loadClassData(this.classId)
          this.$router.push('/classes')
        } else {
          this.loading = false
          this.error = true
          this.errorMessages = 'クラスIDが間違っています'
        }
      })
    },
    async checkExistsClassData(classid: string): Promise<Boolean> {
      const check = await this.$fireStore
        .collection('classData')
        .doc(classid)
        .get()
      return check.exists
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
