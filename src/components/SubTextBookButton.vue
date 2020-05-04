<template>
  <v-btn height="3.5em" class="contentButton">
    <iconText class="icon" />
    <span class="button-string">
      <ruby>副<rt>ふく</rt>教<rt>きょう</rt>材<rt>ざい</rt></ruby>
    </span>
  </v-btn>
</template>

<script>
import iconText from '@/assets/svgs/icon_text.svg'
export default {
  name: 'ContentsButton',
  components: {
    iconText,
  },
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
  font-size: 17px;
  text-align: center;
}
</style>
