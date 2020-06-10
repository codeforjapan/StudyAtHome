<template>
  <div class="EditingScreen">
    <header class="EditingScreen-Header">
      <span>CREATE TIMETABLE</span>
      <h2>時間割作成</h2>
    </header>
    <div class="EditingScreen-Form">
      <slot name="form" />
    </div>
    <div class="EditingScreen-Footer">
      <div class="EditingScreen-Paging">
        <v-btn color="white" fab :disabled="isDisabled">
          <v-icon color="#0071c2">mdi-chevron-left</v-icon>
        </v-btn>
        <span>1/4</span>
        <v-btn color="white" fab :disabled="isDisabled">
          <v-icon color="#0071c2">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <div class="EditingScreen-ActionButtons">
        <action-button class="Button" theme="transparent" text="キャンセル" />
        <action-button
          class="Button"
          theme="primary"
          text="保存する"
          :is-disabled="isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'

export default Vue.extend({
  components: { ActionButton },
  data() {
    return {
      isDisabled: false
    }
  }
})
</script>
