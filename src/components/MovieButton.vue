<template>
  <div class="contentButton">
    <iconMovie class="icon" />
    <div class="button-string">
      <ruby>動<rt>どう</rt>画<rt>が</rt></ruby>
    </div>
  </div>
</template>

<script>
import iconMovie from '@/assets/svgs/icon_movie.svg'
export default {
  name: 'ContentsButton',
  components: {
    iconMovie,
  },
}
</script>

<style scoped>
.contentButton {
  display: flex;
  padding: 10px;
  font-family: 'Noto Sans', sans-serif;
  height: 3em;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: #ffffff;
  border: 1px solid #bdc3c7;
  box-sizing: border-box;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.icon {
  margin-right: 10px;
}
.button-string {
  width: 7em;
  text-align: center;
}
</style>
