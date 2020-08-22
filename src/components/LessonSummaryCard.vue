<template>
  <div class="ContentCard-Outer">
    <v-card
      :class="{
        ContentCard: true,
        'elevation-4': true,
        isHidden: lesson.isHidden
      }"
      @click="toLessonDetail"
    >
      <v-card-actions class="ContentCard-Actions">
        <subject-tag
          class="ContentCard-SubjectTag"
          :name="
            lesson.subject.name || $t('common.lesson_data.labels.subject_name')
          "
          icon-color="white"
          :background-color="lesson.subject.color || '#A5D8FF'"
        />
        <subject-tag
          v-if="lesson.videos.length > 0"
          class="ContentCard-SubjectTag"
          :name="$t('common.lesson_data.tags.video')"
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
    <div v-if="editable" class="ContentCard-Button-Outer">
      <base-editor-button
        class="ContentCard-Button"
        :icon-name="lesson.isHidden ? 'mdi-eye' : 'mdi-eye-off'"
        @click="$emit('toggleHidden')"
      />
      <base-editor-button
        class="ContentCard-Button"
        icon-name="mdi-pencil"
        @click="$emit('clickEditButton')"
      />
      <!--
      <base-editor-button
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
import BaseEditorButton from '@/components/BaseEditorButton.vue'
import { classData } from '~/types/store/classData'
import LessonWithId = classData.LessonWithId

export default Vue.extend({
  components: {
    SubjectTag,
    BaseEditorButton
  },
  props: {
    lesson: {
      type: Object as () => classData.Lesson,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toLessonDetail() {
      const lesson = this.lesson as LessonWithId
      this.$router.push('/lesson/?lessonId=' + lesson.docId)
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

  &.isHidden {
    opacity: 0.6;
  }

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
    word-break: break-all;
  }
}
</style>
