<template>
  <div class="contentButton">
    <iconComment class="icon" />
    <div class="button-string">コメント</div>
  </div>
</template>

<script>
import iconComment from '@/assets/svgs/icon_comment.svg'
export default {
  name: 'CommentButton',
  components: {
    iconComment,
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
