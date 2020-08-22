<template>
  <v-chip class="SubjectTag" :color="backgroundColor">
    <v-avatar class="SubjectIcon">
      <subject-default-icon
        v-if="icon === ''"
        :style="{ height: '14px', fill: iconColor }"
      />
      <v-icon v-else :color="iconColor">{{ icon }}</v-icon>
    </v-avatar>
    <span v-if="!name" class="SubjectTagText">
      {{ $t('common.lesson_data.labels.subject_name') }}
    </span>
    <span v-else class="SubjectTagText">{{ name }}</span>
  </v-chip>
</template>

<script lang="ts">
import Vue from 'vue'
import SubjectDefaultIcon from '@/assets/svgs/icon_subject_default.svg'

export default Vue.extend({
  components: { SubjectDefaultIcon },
  props: {
    name: {
      type: String,
      default() {
        return this.$t('common.lesson_data.labels.subject_name').toString()
      },
    },
    icon: {
      type: String,
      default: '',
    },
    iconColor: {
      type: String,
      default: '#FFF',
    },
    backgroundColor: {
      type: String,
      default: '#A5D8FF',
    },
  },
})
</script>

<style scoped lang="scss">
.SubjectTag {
  padding: 4px 12px;
  .SubjectIcon {
    border-radius: 0;
  }
  .SubjectTagText {
    font-weight: bold;
    font-size: 12px;
    color: $color-gray;
    margin: 8px;
  }
}
</style>
