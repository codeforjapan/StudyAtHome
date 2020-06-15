<template>
  <div>
    <bottom-sheet-layer title="クラス登録" title-en="STEP 2">
      <template v-slot:LayerContents>
        <dl class="RegisterClass-List">
          <dt class="RegisterClass-ItemTitle">学校名</dt>
          <dd>
            <input-field
              v-model="schoolName"
              label="school"
              placeholder="おひさま小学校"
              require
            />
          </dd>
          <dt class="RegisterClass-ItemTitle">クラス名</dt>
          <dd>
            <input-field
              v-model="className"
              label="class"
              placeholder="2年B組"
              require
            />
            <span class="RegisterClass-ItemNote">
              クラス名は表示されますのでご注意ください
            </span>
          </dd>
        </dl>
      </template>
      <template v-slot:LayerFooter>
        <action-button
          :is-disabled="disableButton"
          :is-loading="loading"
          text="登録を完了する"
          theme="primary"
          @click="doRegister"
        />
      </template>
    </bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" absolute color="#C01B61" top>
      クラスの追加に失敗しました。再度登録をお願いします。
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomSheetLayer from '@/components/BottomSheetLayer.vue'
import ActionButton from '@/components/ActionButton.vue'
import InputField from '@/components/InputField.vue'
import { vxm } from '@/store'

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton, InputField },
  layout: 'background',
  middleware: 'authenticated',
  data() {
    return {
      schoolName: '',
      className: '',
      loading: false,
      error: false
    }
  },
  computed: {
    disableButton(): boolean {
      return !(this.schoolName && this.className)
    }
  },
  methods: {
    doRegister() {
      this.loading = true
      vxm.classData
        .registerClass({
          schoolName: this.schoolName,
          className: this.className
        })
        .then(() => {
          this.loading = false
          this.$router.push('/user/registered')
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.RegisterClass-List {
  padding: 24px 0;
}
.RegisterClass-ItemTitle {
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  margin: 4px 0;
}
.RegisterClass-ItemNote {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  margin: 4px 0;
}
</style>
