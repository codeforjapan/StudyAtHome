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
      {{ $t('common.agree_terms.checkbox.agree') }}
      <input
        v-model="toggle"
        type="checkbox"
        value="check"
        class="Checkbox-original"
      />
      <v-icon v-if="isCheck" color="#0071C2">mdi-check-box-outline</v-icon>
      <v-icon v-else color="#0071C2">mdi-checkbox-blank-outline</v-icon>
    </label>
    <base-action-button
      :is-disabled="!isCheck"
      class="Button"
      theme="primary"
      :text="$t('common.agree_terms.buttons.agree')"
      @click="doClassLogin"
    />
    <base-action-button
      class="Button"
      theme="border"
      :text="$t('common.agree_terms.buttons.disagree')"
      @click="$router.push('/')"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PrjLogo from '~/assets/svgs/prj_logo.svg'
import BaseActionButton from '~/components/BaseActionButton.vue'

export default Vue.extend({
  components: { PrjLogo, BaseActionButton },
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
  },
  methods: {
    doClassLogin(): void {}
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
