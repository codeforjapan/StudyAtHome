<template>
  <v-chip class="SubjectTag" :color="backgroundColor">
    <v-avatar class="SubjectIcon">
      <subject-default-icon
        v-if="icon === ''"
        :style="{ height: '14px', fill: iconColor }"
      />
      <v-icon v-else :color="iconColor">{{ icon }}</v-icon>
    </v-avatar>
    <span class="SubjectTagText">{{ name }}</span>
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
      default: '教科名'
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: '#FFF'
    },
    backgroundColor: {
      type: String,
      default: '#A5D8FF'
    }
  }
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
