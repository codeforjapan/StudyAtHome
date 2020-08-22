<template>
  <div>
    <editor-input-field-pickable
      v-model="tempFormData.videoUrl"
      :title="$t('components.editing_screen.labels.video_url')"
      label="video"
      placeholder="https://"
    />

    <editor-input-field-pickable
      v-model="videoSearchWord"
      :title="$t('components.editing_screen.labels.video_keyword')"
      :placeholders="$t('components.editing_screen.placeholder.video_keyword')"
    />

    <div v-if="videoSearchResult.length > 0">
      <h3>NHK For Schoolの動画検索結果</h3>
      <ul>
        <li v-for="(v, i) in videoSearchResult" :key="i">
          <a :href="v.videoUrl" target="_blank">
            {{ v.videoTitle }}
          </a>
        </li>
      </ul>
    </div>
    <video-thumbnail
      v-if="tempFormData.videoTitle && tempFormData.videoThumbnailUrl"
      :caption="tempFormData.videoTitle"
      :title="$t('components.editing_screen.labels.video_thumbnail')"
      :thumbnail-url="tempFormData.videoThumbnailUrl"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import VideoThumbnail from '@/components/VideoThumbnail.vue'
import EditorInputFieldPickable from '~/components/EditorInputFieldPickable.vue'

let movies: any[] = []

export type formData = {
  videoUrl: string
  videoTitle: string
  videoThumbnailUrl: string
}

@Component({
  components: {
    EditorInputFieldPickable,
    VideoThumbnail,
  },
})
export default class EditLessonScreenInner3 extends Vue {
  tempFormData = {
    videoUrl: this.form.videoUrl,
    videoTitle: this.form.videoTitle,
    videoThumbnailUrl: this.form.videoThumbnailUrl,
  }

  @Prop({
    type: Object as () => formData,
    required: true,
    default: () => ({
      videoUrl: '',
      videoTitle: '',
      videoThumbnailUrl: '',
    }),
  })
  public value!: formData

  videoSearchWord: string = ''
  videoSearchResult: formData[] = []

  mounted() {
    fetch('/data/movies.json')
      .then((res) => res.json())
      .then((data) => {
        movies = data
      })
  }

  private get form(): formData {
    return this.value
  }

  @Watch('tempFormData', { deep: true })
  onChangeTempFormData() {
    this.input(this.tempFormData)
  }

  @Watch('videoSearchWord')
  onChangeVideoSearchWord() {
    if (this.videoSearchWord) {
      this.videoSearchResult = movies
        .filter((v) => {
          const fullText = Object.keys(v)
            .map((k) => v[k])
            .join()
          return fullText.includes(this.videoSearchWord)
        })
        .map((v) => {
          return {
            videoUrl: v['教材_ID'],
            videoTitle: v['教材_タイトル'],
            videoThumbnailUrl: '',
          }
        })
    }
  }

  /* CORS 回避必須
  @Watch('form.videoUrl')
  onChangeVideoUrl() {
    fetch(this.form.videoUrl)
      .then(res => res.text())
      .then(text => {
        const el = new DOMParser().parseFromString(text, 'text/html')
        const headEls = el.head.children
        Array.from(headEls).map(v => {
          const prop = v.getAttribute('property')
          if (!prop) return
          if (prop === 'og:title') {
            this.form.videoTitle = '' + v.getAttribute('content')
          }
          if (prop === 'og:image') {
            this.form.videoThumbnailUrl = '' + v.getAttribute('content')
          }
          console.log(prop, v.getAttribute('content'))
        })
      })
  }
  */
  @Emit()
  public input(value: formData) {
    return value
  }
}
</script>
