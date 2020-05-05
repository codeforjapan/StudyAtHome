<template>
  <v-card color="#338dce" class="studycard">
    <div class="studycard-content">
      <div class="timestr">
        <v-icon size="20px" color="#ffffff">mdi-clock-outline</v-icon>
        <div class="schooltime">
          {{ schooltime }}<ruby>時<rt>じ</rt>間<rt>かん</rt>目<rt>め</rt></ruby>
        </div>
        <div class="realtime">
          {{ realtime }}
        </div>
        <v-spacer />
        <v-icon size="20px" color="#ffffff">mdi-bookshelf</v-icon>
        {{ subject }}
      </div>
      <div class="contentstr">
        {{ content }}
      </div>
      <v-row>
        <v-col cols="6">
          <text-book-button />
        </v-col>
        <v-col cols="6">
          <sub-text-book-button />
        </v-col>
        <v-col cols="6">
          <movie-button />
        </v-col>
        <v-col cols="6">
          <comment-button />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import TextBookButton from '@/components/TextBookButton'
import SubTextBookButton from '@/components/SubTextBookButton'
import MovieButton from '@/components/MovieButton'
import CommentButton from '@/components/CommentButton'
export default {
  name: 'StudyCard',
  components: {
    TextBookButton,
    SubTextBookButton,
    MovieButton,
    CommentButton,
  },
  props: {
    schooltime: {
      type: Number,
      default: 1,
    },
    realtime: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: 'No Content Available',
    },
    subject: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.studycard {
  width: 100%;
}
.studycard-content {
  padding: 10px 18px;
}
.timestr {
  font-family: 'Noto Sans', sans-serif;
  height: 100%;
  align-items: center;
  color: #ffffff;
  margin-bottom: 10px;
  display: flex;
}
.schooltime {
  margin-left: 5px;
}
.realtime {
  margin-left: 10px;
}
.contentstr {
  padding: 10px 14px;
  margin-inside: 10px;

  font-family: 'Noto Sans', sans-serif;
  font-size: 12px;
  line-height: 15px;
  width: 100%;
  height: 100%;

  background: #ffffff;
  border-radius: 4px;

  /* Inside Auto Layout */

  flex: none;
  order: 1;
}
</style>
