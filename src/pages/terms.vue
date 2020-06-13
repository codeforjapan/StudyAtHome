<template>
  <div class="MainPage">
    <div class="Logo-outer">
      <prj-logo class="Logo" />
    </div>
    <div class="PolicyText-outer">
      <p>
        一般社団法人コード・フォー・ジャパン（以下、「弊団体」といいます）は、個人情報に関する法令を遵守し、個人情報の適切な取り扱いを実現致します。
      </p>
      <p>
        なお、弊団体が、参加者等（弊団体が運営するイベントやWebページ等への参加者や訪問者をいいます。以下同じ。）から取得した個人情報は、本プライバシーポリシーに従って管理され、参加者等は、弊団体が提供する各種イベントやWebページ（以下、総称して「弊社イベント等」という）を利用する際には、本プライバシーポリシーに定める内容を理解し、これに同意した上で利用するものとします。
      </p>
    </div>
    <label class="Checkbox-label">
      利用規約に同意します
      <input
        v-model="toggle"
        type="checkbox"
        value="check"
        class="Checkbox-original"
      />
      <v-icon v-if="isCheck" color="#0071C2">mdi-check-box-outline</v-icon>
      <v-icon v-else color="#0071C2">mdi-checkbox-blank-outline</v-icon>
    </label>
    <action-button
      :is-disabled="!isCheck"
      class="Button"
      theme="primary"
      text="利用を開始する"
      @click="$emit('clickAgreeButton')"
    />
    <action-button
      class="Button"
      theme="border"
      text="同意しない"
      @click="$router.push('/')"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PrjLogo from '@/assets/svgs/prj_logo.svg'
import ActionButton from '@/components/ActionButton.vue'

export default Vue.extend({
  components: { PrjLogo, ActionButton },
  layout: 'simple',
  data() {
    return {
      toggle: []
    }
  },
  computed: {
    isCheck(): boolean {
      return this.toggle.some(value => {
        return value === 'check'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  background-color: $color-white;
  border-radius: 14px;
  padding: 16px;
}
.Logo-outer {
  display: flex;
  justify-content: center;
}
.Logo {
  width: 115px;
}
.PolicyText-outer {
  background-color: $color-back-gray;
  border-radius: 14px;
  padding: 16px;
}
.Checkbox-label {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
.Checkbox-original {
  display: none;
}
.Button {
  margin-bottom: 16px;
}
</style>
