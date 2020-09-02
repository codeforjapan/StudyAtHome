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

    <div v-if="videoSearchResult.length > 0" class="SearchResult">
      <h3>NHK For Schoolの動画検索結果</h3>
      <ul class="SearchResultList">
        <li
          v-for="(v, i) in videoSearchResult"
          :key="i"
          class="SearchResultItem"
        >
          <a :href="v.videoUrl" target="_blank" class="SearchResultLink">
            {{ v.videoTitle }}&emsp;{{ v.videoSubTitle }}
          </a>
          <p class="SearchResultDescription">{{ v.videoDescription }}</p>
          <span>{{ v.videoPlayTime }}</span>
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
          const videoId = v['教材_ID']
          const bangumi = [1, 2]
          const clip = [3, 4]
          const videoType = parseInt(videoId.slice(5, 6))
          const videoPass = bangumi.includes(videoType)
            ? 'bangumi.cgi'
            : clip.includes(videoType)
            ? 'clip.cgi'
            : ''
          return {
            videoUrl: `https://www2.nhk.or.jp/school/movie/${videoPass}?das_id=${videoId}&p=box`,
            videoTitle: v['教材_タイトル'],
            videoSubTitle: v['教材_サブタイトル'],
            videoDescription: v['教材_説明'],
            videoPlayTime: v['教材_再生時間'],
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

<style lang="scss" scoped>
.SearchResult {
  color: $color-white;
  margin-bottom: 20px;
}
.SearchResultList {
  height: 240px;
  overflow-y: auto;
}
.SearchResultItem {
  margin-bottom: 12px;
}
.SearchResultLink {
  color: $color-white;
}
.SearchResultDescription {
  margin: 0;
}
</style>
