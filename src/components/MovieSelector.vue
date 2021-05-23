<template>
  <div class="MovieSelector">
    <v-select
      v-model="selectedMovie"
      :items="movies"
      item-text="name"
      item-value="sourceType"
      return-object
      class="MovieSelector"
      dense
      hide-details
      solo
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type MovieListItem = { sourceType: string; name: string; dataFile: string }
type LocalData = {
  selectedMovie: string
  movies: MovieListItem[]
}

export default Vue.extend({
  data(): LocalData {
    return {
      selectedMovie: '',
      movies: [],
    }
  },
  mounted() {
    this.selectedMovie =
      this.$root.$i18n.locale === 'zh-tw' ? 'junyiacademy' : 'NHK'
    fetch('/data/movie-source.json')
      .then((res) => res.json())
      .then((data) => {
        this.movies = data
        this.$emit(
          'change',
          this.movies.find((m) => m.sourceType === this.selectedMovie)
        )
      })
  },
})
</script>
