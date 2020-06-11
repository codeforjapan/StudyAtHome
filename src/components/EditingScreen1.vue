<template>
  <div>
    <editor-field
      title="日付設定"
      label="date"
      placeholder="XX月XX日"
      :transparent="true"
      icon-name="mdi-calendar"
    />
    <div class="EditingScreen-Flex EditingScreen-Time">
      <editor-field
        title="時間設定"
        label="start_time"
        placeholder="00:00"
        :transparent="true"
        icon-name="mdi-clock-outline"
        class="TimeField"
      />
      <span class="Hyphen">-</span>
      <editor-field
        label="end_time"
        placeholder="00:00"
        :transparent="true"
        icon-name="mdi-clock-outline"
        class="TimeField"
      />
    </div>
    <editor-field title="タイトル" label="title" placeholder="例）理科" />
    <div class="EditingScreen-Flex">
      <editor-field
        title="教科名"
        label="lesson"
        placeholder="例）理科"
        class="LessonField"
      />
      <editor-field
        title="ラベル色"
        icon-name="mdi-palette"
        class="LabelField"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorField from '~/components/EditorField.vue'

export default Vue.extend({
  components: { EditorField }
})
</script>

<style lang="scss" scoped>
.EditingScreen-Flex {
  display: flex;
  justify-content: space-between;
}
.EditingScreen-Time {
  align-items: flex-end;

  .TimeField {
    flex: 0 1 48%;
  }

  .Hyphen {
    flex: 0 1 auto;
    align-self: center;
    color: $color-white;
    font-size: 40px;
    padding: 0 8px;
  }
}
.LessonField {
  flex: 0 1 52%;
}
.LabelField {
  flex: 0 1 45%;
}
</style>
