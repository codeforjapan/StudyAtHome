<template>
  <div class="contentButton">
    <iconBook class="icon" />
    <div class="button-string">
      <ruby>教<rt>きょう</rt>科<rt>か</rt>書<rt>しょ</rt></ruby>
    </div>
  </div>
</template>

<script>
import iconBook from '@/assets/svgs/icon_book.svg'
export default {
  name: 'ContentsButton',
  components: {
    iconBook,
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
