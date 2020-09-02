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

    <button class="SearchButton" @click="handleVideoSearchWord">
      検索する
    </button>

    <div v-if="videoSearchResult.length > 0" class="SearchResult">
      <h3>NHK For Schoolの動画検索結果</h3>
      <ul>
        <li v-for="(v, i) in displayLists" :key="i" class="SearchResultItem">
          <component
            :is="v.videoUrl ? 'a' : 'span'"
            :href="v.videoUrl"
            :target="v.videoUrl ? '_blank' : null"
            class="SearchResultLink"
          >
            {{ v.videoTitle }}&emsp;{{ v.videoSubTitle }}
          </component>
          <p class="SearchResultDescription">{{ v.videoDescription }}</p>
          <span>{{ v.videoPlayTime }}</span>
          <br />
          <img
            v-if="v.videoThumbnailUrl"
            :src="v.videoThumbnailUrl"
            :alt="v.videoTitle"
            width="240"
          />
        </li>
      </ul>
      <v-pagination
        v-model="page"
        :length="length"
        :total-visible="5"
        @input="pageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import EditorInputFieldPickable from '~/components/EditorInputFieldPickable.vue'

let movies: any[] = []

export type formData = {
  videoUrl: string | null
  videoTitle: string
  videoThumbnailUrl: string
}

@Component({
  components: {
    EditorInputFieldPickable,
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
      videoUrl: null,
      videoTitle: '',
      videoThumbnailUrl: '',
    }),
  })
  public value!: formData

  videoSearchWord: string = ''
  videoSearchResult: formData[] = []
  page: number = 1
  pageSize: number = 5
  length: number = 0
  displayLists: formData[] = []

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

  private handleVideoSearchWord() {
    if (this.videoSearchWord) {
      this.page = 1
      this.videoSearchResult = movies
        .filter((v) => {
          const fullText = Object.keys(v)
            .map((k) => v[k])
            .join()
          return fullText.includes(this.videoSearchWord)
        })
        .map((v) => {
          const videoId = v['教材_ID']
          const videoType = parseInt(videoId.slice(5, 6))
          const nfsMovieUrl = 'https://www2.nhk.or.jp/school/movie/'
          const videoDirectory = videoId.slice(0, 8)
          let videoThumbnailUrl = `https://www.nhk.or.jp/das/image/${videoDirectory}/${videoId}_S_005.jpg`
          let videoUrl
          switch (videoType) {
            case 1:
            case 2:
              videoUrl = `${nfsMovieUrl}bangumi.cgi?das_id=${videoId}&p=box`
              break
            case 3:
            case 4:
              videoUrl = `${nfsMovieUrl}clip.cgi?das_id=${videoId}&p=box`
              break
            default:
              videoUrl = null
              videoThumbnailUrl = ''
          }
          return {
            videoUrl,
            videoTitle: v['教材_タイトル'],
            videoSubTitle: v['教材_サブタイトル'],
            videoDescription: v['教材_説明'],
            videoPlayTime: v['教材_再生時間'],
            videoThumbnailUrl,
          }
        })

      this.length = Math.ceil(this.videoSearchResult.length / this.pageSize)

      this.displayLists = this.videoSearchResult.slice(0, this.pageSize)
    }
  }

  private pageChange(pageNumber: number) {
    this.displayLists = this.videoSearchResult.slice(
      this.pageSize * (pageNumber - 1),
      this.pageSize * pageNumber
    )
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
.SearchButton {
  color: $color-white;
  margin-bottom: 20px;
}
.SearchResult {
  color: $color-white;
  margin-bottom: 20px;
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
