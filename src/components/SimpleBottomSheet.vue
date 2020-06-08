<template>
  <v-bottom-sheet
    v-model="sheet"
    class="sheet"
    persistent
    scrollable
    hide-overlay
  >
    <v-card class="card">
      <v-card-title class="card-title" />
      <v-card-text class="card-text">
        <v-container class="container">
          <v-row class="row">
            <v-col class="col message">{{ message }}</v-col>
            <v-col cols="2">
              <span class="add-button">
                <AddButton @addButtonClicked="addButtonClicked" />
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import AddButton from '@/components/AddButton.vue'

export default Vue.extend({
  name: 'SimpleBottomSheet',
  components: { AddButton },
  props: {
    message: {
      type: String,
      default: 'メッセージ',
      required: true
    },
    expanded: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      sheet: this.expanded
    }
  },
  methods: {
    addButtonClicked() {
      this.$emit('addButtonClicked')
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  background-color: $color-base-color-07;
  border-radius: 24px 24px 0 0 !important;
}

.card-title {
  padding: 8px !important;
}
.card-text {
  padding: 0 !important;
}

.container {
  padding: 0 16px 16px;
}

.row {
  margin: 0;
  padding: 0;
}

.col {
  padding: 0;
}

.message {
  align-self: center;
  color: $color-white !important;
}

.add-button {
  align-self: start;
  float: right;
}
</style>
