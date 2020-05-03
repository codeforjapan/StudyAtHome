<template>
  <v-card class="studycard">
    <div class="studycard-content">
      <div class="timestr">
        <v-icon size="20px" color="#ffffff">mdi-clock-outline</v-icon>
        <div class="schooltime">
          {{ schooltime }}<ruby>時<rt>じ</rt>間<rt>かん</rt>目<rt>め</rt></ruby>
        </div>
        <div class="realtime">
          {{ realtime }}
        </div>
      </div>
      <div class="contentstr">
        {{ content }}
      </div>
      <v-row>
        <v-col>
          <text-book-button />
        </v-col>
        <v-col>
          <sub-text-book-button />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <movie-button />
        </v-col>
        <v-col>
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
      type: String,
      default: '1',
    },
    realtime: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: 'No Content Available',
    },
  },
}
</script>

<style scoped>
.studycard {
  width: 100%;
  background-color: #338dce;
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
