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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PrjLogo from '@/assets/svgs/prj_logo.svg'

export default Vue.extend({
  components: { PrjLogo },
  layout: 'simple'
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
</style>
