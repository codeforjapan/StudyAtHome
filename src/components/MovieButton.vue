<template>
  <v-btn height="3.5em" class="contentButton">
    <iconMovie class="icon" />
    <span class="button-string">
      <ruby>動<rt>どう</rt>画<rt>が</rt></ruby>
    </span>
  </v-btn>
</template>

<script>
import iconMovie from '@/assets/svgs/icon_movie.svg'
export default {
  name: 'ContentsButton',
  components: {
    iconMovie
  }
}
</script>

<style scoped>
.contentButton {
  display: flex;
  padding: 10px;
  width: 100%;
  font-family: 'Noto Sans', sans-serif;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: #fff;
  border: 1px solid #bdc3c7;
  box-sizing: border-box;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.icon {
  margin-right: 5%;
}
.button-string {
  width: 5em;
  font-size: 17px;
  text-align: center;
}
</style>
