<template>
  <div>
    <editor-input-field-pickable
      v-model="tempFormData.videoUrl"
      :title="$t('components.editing_screen.labels.video_url')"
      placeholder="https://"
    />

    <div class="VideoSearch">
      <editor-input-field-pickable
        v-model="videoSearchWord"
        selector="video"
        :title="
          $t('components.editing_screen.labels.video_keyword', {
            source: '',
          })
        "
        :placeholder="$t('components.editing_screen.placeholder.video_keyword')"
        icon-name="mdi-magnify"
        :button-text="$t('components.editing_screen.search_videos.search')"
        @clickButton="handleVideoSearchWord"
        @changeMovie="handleChangeMovie"
      />

      <div v-if="videoSearchResult.length > 0" class="SearchResult">
        <h3 class="SearchResultTitle">
          {{
            $t('components.editing_screen.search_videos.search_result', {
              source: '',
            })
          }}
        </h3>
        <ul class="SearchResultList">
          <li v-for="(v, i) in displayLists" :key="i" class="SearchResultItem">
            <div class="SearchResultLinkOuter">
              <component
                :is="v.videoUrl ? 'a' : 'span'"
                :href="v.videoUrl"
                :target="v.videoUrl ? '_blank' : null"
              >
                {{ v.videoTitle }}&emsp;{{ v.videoSubTitle }}
              </component>
              <div>
                <span class="SearchResultPlayTime">{{ v.videoPlayTime }}</span>
              </div>
            </div>
            <p>{{ v.videoDescription }}</p>
            <div class="SearchResultImgOuter">
              <img
                v-if="v.videoThumbnailUrl"
                :src="v.videoThumbnailUrl"
                :alt="v.videoTitle"
                width="240"
              />
              <v-btn
                v-if="v.videoUrl"
                class="SearchResultButton"
                color="#338dce"
                @click="registerVideoUrl(v.videoUrl)"
              >
                <v-icon color="white"> mdi-link </v-icon>
                {{
                  $t(
                    'components.editing_screen.search_videos.add_to_video_urls'
                  )
                }}
              </v-btn>
            </div>
          </li>
        </ul>
        <v-pagination
          v-model="page"
          :length="length"
          :total-visible="5"
          color="#0071c2"
          @input="pageChange"
        />
      </div>
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
  videoThumbnailUrl: string | null
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
    videoThumbnailUrl:
      this.form.videoThumbnailUrl !== '' ? this.form.videoThumbnailUrl : null,
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

  videoSourceType: string = ''
  videoSearchWord: string = ''
  videoSearchResult: formData[] = []
  page: number = 1
  pageSize: number = 5
  length: number = 0
  displayLists: formData[] = []

  mounted() {
    // fetch('/data/movies.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     movies = data
    //   })
  }

  private get form(): formData {
    return this.value
  }

  @Watch('tempFormData', { deep: true })
  onChangeTempFormData() {
    this.input(this.tempFormData)
  }

  @Watch('value', { deep: true })
  onChangeValueFormData() {
    if (this.value.videoUrl === '') {
      this.videoSearchWord = ''
      this.videoSearchResult = []
    }
    this.tempFormData = this.value
  }

  private handleChangeMovie(selected) {
    this.videoSourceType = selected.sourceType
    fetch(`/data/${selected.dataFile}`)
      .then((res) => res.json())
      .then((data) => {
        movies = data
      })
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
          let videoInfo
          switch (this.videoSourceType) {
            case 'NHK':
              videoInfo = this.mapNhk(v)
              break
            case 'junyiacademy':
              videoInfo = this.mapJunyiacademy(v)
              break
          }
          return videoInfo
        })

      this.length = Math.ceil(this.videoSearchResult.length / this.pageSize)

      this.displayLists = this.videoSearchResult.slice(0, this.pageSize)
    }
  }

  private registerVideoUrl(url: string) {
    this.tempFormData.videoUrl = url
  }

  private pageChange(pageNumber: number) {
    this.displayLists = this.videoSearchResult.slice(
      this.pageSize * (pageNumber - 1),
      this.pageSize * pageNumber
    )
  }

  private mapNhk(v) {
    const videoId = v.inherentProperties.教材_ID
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
      videoTitle: v.title,
      videoSubTitle: v.inherentProperties.教材_サブタイトル,
      videoDescription: v.description,
      videoPlayTime: v.inherentProperties.教材_再生時間,
      videoThumbnailUrl,
    }
  }

  private mapJunyiacademy(v) {
    return {
      videoUrl: v.inherentProperties.url,
      videoTitle: v.title,
      videoSubTitle: '',
      videoDescription: v.description,
      videoPlayTime: '',
      videoThumbnailUrl: v.inherentProperties.thumbnailUrl,
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
.VideoSearch {
  background-color: $color-base-color-02;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
.SearchResult {
  border-top: 1px solid $color-base-color-03;
}
.SearchResultTitle {
  color: $color-white;
  text-align: center;
  margin: 16px 0;
}
.SearchResultList {
  padding: 0;
  list-style: none;
}
.SearchResultItem {
  background-color: $color-white;
  padding: 18px;
  margin-bottom: 12px;
}
.SearchResultLinkOuter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.SearchResultPlayTime {
  display: inline-block;
  font-size: 12px;
  border: 2px solid $color-gray;
  border-radius: 3em;
  padding: 2px 10px;
}
.SearchResultImgOuter {
  position: relative;
  margin-bottom: 16px;
}
.SearchResultButton {
  position: absolute;
  right: -6px;
  bottom: -12px;
  color: $color-white;
  border-radius: 8px;
}
</style>
