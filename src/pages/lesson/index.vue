<template>
  <div class="lesson">
    <div>
      <v-sheet class="lesson-meta">
        <div>
          <span class="lesson-meta-date"> {{ dateString }}</span
          ><span class="lesson-meta-caption"
            >{{ caption.title }}{{ caption.unit }}</span
          ><span class="lesson-meta-period"
            >&nbsp;/&nbsp;{{ startTimeString }}&nbsp;-&nbsp;{{
              endTimeString
            }}</span
          >
        </div>
        <div>
          <SubjectTag
            v-if="lesson.subject && lesson.subject.name && lesson.subject.color"
            class="subject-tag"
            :name="lesson.subject.name"
            :background-color="lesson.subject.color"
          />
          <SubjectTag
            v-if="lesson.videos.length"
            class="subject-tag"
            :name="$t('common.lesson_data.tags.video')"
            :icon="'mdi-video'"
            :icon-color="'#FFFFFF'"
            :background-color="'#D0BFFF'"
          />
        </div>
      </v-sheet>
    </div>
    <div>
      <v-sheet class="lesson-data">
        <div class="lesson-title">
          {{ lesson.title }}
        </div>

        <div class="item-label">
          {{ $t('common.lesson_data.labels.textbook') }}
        </div>
        <div class="item-value">
          <span v-if="lesson.text && lesson.text.title && lesson.text.page">
            {{ lesson.text.title }} {{ lesson.text.page }}
          </span>
          <span v-if="lesson.pages">
            {{ lesson.pages }}
          </span>
        </div>

        <div class="divider">
          <v-divider />
        </div>

        <div class="item-label">
          {{ $t('common.lesson_data.labels.goal') }}
        </div>
        <div v-if="lesson.goal" class="item-value">
          {{ lesson.goal }}
        </div>

        <div class="item-label">
          {{ $t('common.lesson_data.labels.description') }}
        </div>
        <div v-if="lesson.description" class="item-value">
          {{ lesson.description }}
        </div>

        <div class="item-label">
          {{ $t('common.lesson_data.labels.videos') }}
        </div>
        <div v-if="lesson.videos.length > 0">
          <div v-for="(item, index) in lesson.videos" :key="index">
            <div class="item-label">
              <a
                :href="item.url"
                target="_blank"
                rel="noopener"
                class="external-link"
              >
                {{ item.url }}
              </a>
            </div>
            <v-img :src="item.thumbnailUrl" class="video-thumbnail-image" />
          </div>
        </div>

        <div class="item-label">
          {{ $t('common.lesson_data.labels.materials') }}
        </div>
        <div v-if="lesson.materials.length">
          <div
            v-for="(item, index) in lesson.materials"
            :key="index"
            class="item-value material-box"
          >
            <span v-if="item.title">{{ item.title }}</span>
            <span v-if="item.url">
              <v-icon
                class="material-box-icon"
                @click="openExternalLink(item.url)"
                >mdi-open-in-new</v-icon
              >
            </span>
          </div>
        </div>

        <div class="divider">
          <v-divider style="border-color: transparent" />
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import SubjectTag from '@/components/SubjectTag.vue'
import classData from '~/types/store/classData'
import LessonWithId = classData.LessonWithId

type DataType = {
  lesson: LessonWithId
}

export default Vue.extend({
  layout: 'lesson',
  components: { SubjectTag },
  // filters: {
  //   dateString: function dateString(lesson: LessonWithId): string {
  //     return this.$dayjs(lesson.startTime)
  //       .locale('ja')
  //       .format('M月D日（ddd）')
  //   }
  // },
  props: {
    caption: {
      type: Object,
      required: false,
      default() {
        return { title: '1', unit: '時間目' }
      },
    },
    dummyLesson: {
      type: Object,
      required: false,
      default() {
        return {
          id: '',
          startTime: new Date(),
          endTime: this.$dayjs().add(40, 'minute'),
          title: '授業のタイトル',
          subject: {
            name: '教科名',
            color: '#7FFFD4',
          },
          // objectives: '学習の目的',
          // description: '詳細説明',
          goal: '',
          // text: {
          //   title: 'テキストX',
          //   page: '12~19'
          // },
          videos: [
            {
              title: '動画タイトル',
              url: 'http://example.com/',
              thumbnailUrl: 'https://picsum.photos/1280/720',
            },
            {
              title: '動画2タイトル',
              url: 'http://example.com/',
              thumbnailUrl: 'https://picsum.photos/1280/720',
            },
          ],
          pages: '12~19',
          materials: [
            {
              title: '副教材のタイトル',
              url: 'http://example.com/',
            },
            {
              title: '副教材Xのタイトル',
              url: 'http://example.com/',
            },
          ],
          isHidden: false,
        }
      },
    },
  },
  data(): DataType {
    return {
      lesson: {
        id: '',
        startTime: new Date(),
        endTime: new Date(),
        title: '',
        // subjectName: '',
        // subjectColor: '#7FFFD4',
        subject: {
          name: '',
          color: '',
        },
        goal: '',
        // objectives: '',
        description: '',
        // text: {
        //   title: '',
        //   page: ''
        // },
        videos: [],
        pages: '12~19',
        materials: [],
        isHidden: false,
      },
    }
  },
  computed: {
    dateString(): string {
      return this.$dayjs(this.lesson.startTime).format('LL（ddd）')
    },
    dateTitle(): string {
      return this.$dayjs(this.lesson.startTime).format('M/D')
    },
    startTimeString(): string {
      return this.$dayjs(this.lesson.startTime).format('H:mm')
    },
    endTimeString(): string {
      return this.$dayjs(this.lesson.startTime).format('YYYY-MM-DD') ===
        this.$dayjs(this.lesson.endTime).format('YYYY-MM-DD')
        ? this.$dayjs(this.lesson.endTime).format('H:mm')
        : this.$dayjs(this.lesson.endTime).format('H:mm（M/D）')
    },
  },
  async mounted() {
    const lessonList = await vxm.classData.lessonsOnCurrentDateAuthModeAPIKEY(
      vxm.app.currentDate
    )
    await this.$nextTick(function () {
      const data: LessonWithId | undefined = lessonList.find(
        (e) => this.$route.query.lessonId === e.id
      ) as LessonWithId | undefined
      this.lesson = data ?? this.dummyLesson
    })
  },
  methods: {
    openExternalLink(url: string): void {
      window.open(url, '_blank', 'noopener')
    },
  },
})
</script>

<style lang="scss" scoped>
.lesson {
  height: 100%;
}

.lesson-meta {
  background: transparent;
}

.lesson-meta-date {
  vertical-align: middle;
  font-family: 'Noto Sans JP', sans-serif;
  color: $color-back-gray;
  font-size: 21px;
}

.lesson-meta-caption {
  vertical-align: middle;
  font-family: 'Noto Sans JP', sans-serif;
  color: $color-back-gray;
  font-size: 12px;
  white-space: nowrap;
}

.lesson-meta-period {
  vertical-align: middle;
  font-family: 'Noto Sans JP', sans-serif;
  color: $color-back-gray;
  font-size: 12px;
  white-space: nowrap;
}

.lesson-data {
  border-radius: 14px;
  width: 100%;
}

.meta-period {
  margin: 4px 16px;
}

.lesson-title {
  margin: 24px 16px 0;
  padding: 24px 0 0;
  font-size: 21px;
}

.lesson-body {
  width: 100%;
}

.subject-tag {
  margin: 10px 6px 0;
}

.item-label {
  margin: 32px 10px 10px;
  font-family: 'Noto Sans', sans-serif;
  font-size: 14px;
  color: $color-grey-inactive;
}

.item-value {
  margin: 0 16px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  color: $color-gray;
  word-break: break-all;
}

.lesson-material {
  margin: 0 16px 0;
}

.video-thumbnail-image {
  margin: 4px 0;
}

.external-link {
  text-decoration: none;
}

.divider {
  margin: 16px 0 0;
}

.material-box {
  margin: 0 16px 16px;
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: $color-base-color-01;
  border-style: solid;
  color: $color-base-color-01;
}

.material-box-icon {
  color: $color-base-color-01;
  align-self: start;
  float: right;
}
</style>
