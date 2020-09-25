<template>
  <div class="MainPage">
    <div v-if="Object.keys(classData.lessonsGroupByPeriod).length > 0">
      <period-section
        v-for="(lessons, time, index) in classData.lessonsGroupByPeriod"
        :key="index"
        :period="index"
        :time="time"
        :class-data="lessons"
        :editable="true"
        @toggleHidden="doToggleHidden"
        @clickEditButton="doEdit"
      />
      <ul class="Classes-List">
        <li>
          <a
            class="white--text"
            href="http://www.studyathome.jp/"
            target="_blank"
            rel="noopener"
          >
            {{ $t('common.footer.about') }}
          </a>
        </li>
        <li>
          <a
            class="white--text"
            href="https://forms.gle/G91PJ7T8ipTtYeGA6"
            target="_blank"
            rel="noopener"
          >
            {{ $t('common.footer.contact') }}
          </a>
        </li>

        <li>
          <nuxt-link class="white--text" to="policy">
            {{ $t('common.footer.terms') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-else-if="today" class="Classes-Outer">
      <h1 class="Classes-Title">
        {{ $t('pages.edit_index.no_lessons_today') }}
      </h1>
      <ul class="Classes-List">
        <li>
          <a
            class="white--text"
            href="http://www.studyathome.jp/"
            target="_blank"
            rel="noopener"
          >
            {{ $t('common.footer.about') }}
          </a>
        </li>
        <li>
          <a
            class="white--text"
            href="https://forms.gle/G91PJ7T8ipTtYeGA6"
            target="_blank"
            rel="noopener"
          >
            {{ $t('common.footer.contact') }}
          </a>
        </li>

        <li>
          <nuxt-link class="white--text" to="policy">
            {{ $t('common.footer.terms') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-else class="Classes-Outer">
      <h1 class="Classes-Title">
        {{ $t('pages.edit_index.no_lessons', { date: dateTitle }) }}
      </h1>
      <ul class="Classes-List">
        <li>
          <a
            class="white--text"
            href="http://www.studyathome.jp/"
            target="_blank"
            rel="noopener"
          >
            {{ $t('common.footer.about') }}
          </a>
        </li>
        <li>
          <a
            class="white--text"
            href="https://forms.gle/G91PJ7T8ipTtYeGA6"
            target="_blank"
            rel="noopener"
          >
            {{ $t('common.footer.contact') }}
          </a>
        </li>

        <li>
          <nuxt-link class="white--text" to="policy">
            {{ $t('common.footer.terms') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <edit-lesson-screen-bottom-sheet
      :message="
        $t('pages.edit_index.add_or_edit_lesson', { className: '2年B組' })
      "
      :expanded="!editingMode"
      @clickAddButton="toggleScreen"
    />
    <edit-lesson-screen
      :value="editPageValue"
      :expanded="editingMode"
      @collapse="onCollapseEditLessonScreen"
    />
    <editing-visibility-dialog
      :value="editVisibilityDialogValue"
      :editing-visibility-mode="editingVisibilityMode"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import isToday from 'date-fns/isToday'
import { vxm } from '@/store'
import PeriodSection from '@/components/PeriodSection.vue'
import EditLessonScreenBottomSheet from '@/components/EditLessonScreenBottomSheet.vue'
import EditLessonScreen from '@/components/EditLessonScreen.vue'
import EditingVisibilityDialog from '@/components/EditingVisibilityDialog.vue'
import classData from '@/types/store/classData'

type DataType = {
  classData: typeof vxm.classData
  editingMode: boolean
  editingVisibilityMode: boolean
  editPageValue: object
  editVisibilityDialogValue: object
}

type Computed = {
  today: boolean
  dateTitle: string
}

const editPageValueDefault = {
  isHidden: false,
  lessonId: '',
  date: '',
  startTime: '',
  endTime: '',
  title: '',
  subjectName: '',
  subjectColor: '#BAC8FF',
  goal: '',
  description: '',
  videoUrl: '',
  videoTitle: '',
  videoThumbnailUrl: '',
  pages: '',
  materialsTitle: '',
  materialsUrl: '',
}

export default Vue.extend({
  components: {
    PeriodSection,
    EditLessonScreenBottomSheet,
    EditLessonScreen,
    EditingVisibilityDialog,
  },
  layout: 'protected',
  data(): DataType {
    return {
      classData: vxm.classData,
      editingMode: false,
      editingVisibilityMode: false,
      editPageValue: Object.assign({}, editPageValueDefault),
      editVisibilityDialogValue: {},
    }
  },
  computed: {
    currentDate() {
      return vxm.app.currentDate
    },
    today() {
      return isToday(vxm.app.currentDate)
    },
    dateTitle() {
      return dayjs(vxm.app.currentDate).format('M/D')
    },
  },
  watch: {
    currentDate() {
      this.classData.getLessonsByCurrentDate()
    },
  },
  mounted() {
    this.classData.getLessonsByCurrentDate()
  },
  methods: {
    onCollapseEditLessonScreen(): void {
      this.toggleScreen()
      this.resetEditLessonScreen()
    },
    toggleScreen(): void {
      this.editingMode = !this.editingMode
    },
    closeModal(): void {
      this.editVisibilityDialogValue = {}
      this.editingVisibilityMode = false
    },
    openVisibilityModal(): void {
      this.editingVisibilityMode = true
    },
    resetEditLessonScreen(): void {
      this.editPageValue = Object.assign({}, editPageValueDefault)
    },
    doToggleHidden(value: classData.LessonWithId): void {
      this.openVisibilityModal()
      this.editVisibilityDialogValue = value
    },
    // @todo doEdit の中身を整理する
    doEdit(value: classData.LessonWithId): void {
      const videoUrl = value.videos.length === 0 ? '' : value.videos[0].url
      const videoTitle = value.videos.length === 0 ? '' : value.videos[0].title
      const videoThumbnailUrl =
        value.videos.length === 0 ? '' : value.videos[0].thumbnailUrl
      const materialTitle =
        value.materials.length === 0 ? '' : value.materials[0].title
      const materialUrl =
        value.materials.length === 0 ? '' : value.materials[0].url
      this.editPageValue = {
        isHidden: value.isHidden,
        lessonId: value.id,
        date: dayjs(value.startTime).format('YYYY-MM-DD'),
        startTime: dayjs(value.startTime).format('HH:mm'),
        endTime: dayjs(value.endTime).format('HH:mm'),
        title: value.title,
        subjectName: value.subject.name,
        subjectColor: value.subject.color,
        goal: value.goal,
        description: value.description,
        videoUrl,
        videoTitle,
        videoThumbnailUrl,
        pages: value.pages,
        materialsTitle: materialTitle,
        materialsUrl: materialUrl,
      }
      this.toggleScreen()
    },
  },
})
</script>

<style lang="scss" scoped>
.MainPage {
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
}
.Classes-Outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1 0 auto;
}
.Classes-Title {
  font-size: 21px;
  font-weight: normal;
  color: $color-white;
  text-align: center;
}
.Classes-List {
  font-size: 12px;
  color: $color-white;
  text-align: center;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 12px;

    &::before {
      content: '-';
      padding-right: 8px;
    }
  }
}
</style>
