<template>
  <div class="ContentCard-Outer">
    <v-card class="ContentCard elevation-4">
      <v-card-actions class="ContentCard-Actions">
        <subject-tag
          class="ContentCard-SubjectTag"
          :name="lesson.subject.name || '教科名'"
          :icon="lesson.subject.icon || ''"
          :icon-color="lesson.subject.iconColor || 'white'"
          :background-color="lesson.subject.color || '#A5D8FF'"
        />
        <subject-tag
          v-if="lesson.videos.length >= 1"
          class="ContentCard-SubjectTag"
          :name="'動画'"
          :icon="'mdi-video'"
          :icon-color="'#424242'"
          :background-color="'#E0E0E0'"
        />
      </v-card-actions>
      <v-card-title>
        <h2 class="ContentCard-Title">{{ lesson.title }}</h2>
      </v-card-title>
      <v-card-text>
        <p class="ContentCard-Description">{{ lesson.description }}</p>
      </v-card-text>
    </v-card>
    <div class="ContentCard-Button-Outer">
      <content-card-editor-button
        class="ContentCard-Button"
        icon-name="mdi-eye-off"
        @click="$emit('changeHide')"
      />
      <content-card-editor-button
        class="ContentCard-Button"
        icon-name="mdi-pencil"
        @click="$emit('editButtonClick')"
      />
      <!--
      <content-card-editor-button
        class="ContentCard-Button"
        icon-name="mdi-file-multiple"
      />
      -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SubjectTag from '@/components/SubjectTag.vue'
import ContentCardEditorButton from '@/components/ContentCardEditorButton.vue'
export default Vue.extend({
  components: {
    SubjectTag,
    ContentCardEditorButton
  },
  props: {
    lesson: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
})
</script>

<style scoped lang="scss">
.ContentCard-Outer {
  display: flex;
}
.ContentCard-Button-Outer {
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  margin-left: 12px;
  .ContentCard-Button {
    margin-bottom: 12px;
  }
}
.ContentCard {
  flex: 1 1 auto;
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
