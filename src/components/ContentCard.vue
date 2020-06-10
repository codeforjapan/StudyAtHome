<template>
  <v-card class="ContentCard elevation-4">
    <v-card-actions class="ContentCard-Actions">
      <subject-tag
        v-for="(item, idx) in subjects"
        :key="idx"
        class="ContentCard-SubjectTag"
        :name="item.name || '教科名'"
        :icon="item.icon || ''"
        :icon-color="item.iconColor || 'white'"
        :background-color="item.backgroundColor || '#A5D8FF'"
      />
      <subject-tag
        class="ContentCard-SubjectTag"
        :name="'動画'"
        :icon="'mdi-video'"
        :icon-color="'#424242'"
        :background-color="'#E0E0E0'"
      />
    </v-card-actions>
    <v-card-title>
      <h2 class="ContentCard-Title">{{ title }}</h2>
    </v-card-title>
    <v-card-text>
      <p class="ContentCard-Description">{{ description }}</p>
    </v-card-text>
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
  .ContentCard-Actions {
    padding: 16px 16px 0;
  }
  .ContentCard-SubjectTag {
    margin-right: 4px;
  }
  .ContentCard-Title {
    font-weight: bold;
    font-size: 14px;
    line-height: 1.75;
  }
  .ContentCard-Description {
    font-size: 12px;
    color: $color-gray;
    margin: 0;
  }
}
</style>
