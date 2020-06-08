<template>
  <v-card class="ContentCard">
    <v-card-actions>
      <subject-tag
        v-for="(item, idx) in subjects"
        :key="idx"
        class="ContentCard-SubjectTag"
        :name="item.name || '教科名'"
        :icon="item.icon || ''"
        :icon-color="item.iconColor || 'white'"
        :background-color="item.backgroundColor || '#A5D8FF'"
      />
    </v-card-actions>
    <v-card-title>
      <h2 class="ContentCard-Title">{{ title }}</h2>
    </v-card-title>
    <v-card-text class="ContentCard-Description">{{ description }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import SubjectTag from '@/components/SubjectTag.vue'

export default Vue.extend({
  components: { SubjectTag },
  props: {
    subjects: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
.ContentCard {
  color: $color-gray;
  border-radius: 14px !important;
  .ContentCard-SubjectTag {
    margin-right: 4px;
  }
  .ContentCard-Title {
    font-weight: bold;
    font-size: 14px;
  }
  .ContentCard-Description {
    white-space: pre-wrap;
    font-size: 12px;
  }
}
</style>
