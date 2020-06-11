<template>
  <bottom-sheet-layer title="ユーザー登録" title-en="STEP 1" fullscreen>
    <template v-slot:LayerContents>
      <dl>
        <dt class="SignUp-ItemTitle">お名前（表示名）</dt>
        <dd>
          <input-field label="name" placeholder="山田花子" require />
        </dd>
        <dt class="SignUp-ItemTitle">メールアドレス</dt>
        <dd>
          <input-field
            label="email"
            placeholder="hogehoge@hogehoge.com"
            type="email"
            require
          />
        </dd>
        <dt class="SignUp-ItemTitle">パスワード</dt>
        <dd>
          <input-field label="password" type="password" require />
        </dd>
        <dt class="SignUp-ItemTitle">パスワード（確認用）</dt>
        <dd>
          <input-field label="confirmation" type="password" require />
        </dd>
      </dl>
    </template>
    <template v-slot:LayerFooter>
      <div class="SignUp-ButtonOuter">
        <action-button
          theme="transparent"
          text="キャンセル"
          class="SignUp-Button"
        />
        <action-button theme="primary" text="登録" class="SignUp-Button" />
      </div>
    </template>
  </bottom-sheet-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomSheetLayer from '@/components/BottomSheetLayer.vue'
import ActionButton from '@/components/ActionButton.vue'
import InputField from '@/components/InputField.vue'

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton, InputField },
  layout: 'background'
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
.SignUp-ButtonOuter {
  display: flex;
  justify-content: space-between;
}
.SignUp-Button {
  flex: 0 1 48%;
}
</style>
