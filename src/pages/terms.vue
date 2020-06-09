<template>
  <div>
    <action-button theme="primary" text="利用を開始する" />
    <action-button theme="border" text="同意しない" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'

export default Vue.extend({
  components: { ActionButton },
  layout: 'default'
})
</script>
