<template>
  <bottom-sheet-layer title="クラス登録" title-en="STEP 2">
    <template v-slot:LayerContents>
      <dl class="RegisterClass-List">
        <dt class="RegisterClass-ItemTitle">学校名</dt>
        <dd>
          <input-field label="school" placeholder="おひさま小学校" require />
        </dd>
        <dt class="RegisterClass-ItemTitle">クラス名</dt>
        <dd>
          <input-field label="class" placeholder="2年B組" require />
          <span class="RegisterClass-ItemNote">
            クラス名は表示されますのでご注意ください
          </span>
        </dd>
      </dl>
    </template>
    <template v-slot:LayerFooter>
      <action-button theme="primary" text="登録を完了する" />
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
