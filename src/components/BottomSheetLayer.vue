<template>
  <v-bottom-sheet
    v-model="layer"
    persistent
    scrollable
    :fullscreen="fullscreen"
  >
    <v-card class="Layer">
      <v-card-title class="Layer-CardElements Layer-CardTitle">
        <v-container class="Layer-Container">
          <div class="Layer-Header">
            <span class="TitleEn">{{ titleEn }}</span>
            <h2 class="Title">{{ title }}</h2>
          </div>
        </v-container>
      </v-card-title>
      <v-card-text class="Layer-CardText">
        <v-container class="Layer-FormContainer">
          <slot name="LayerContents" />
        </v-container>
      </v-card-text>
      <v-card-actions class="Layer-CardElements Layer-CardActions">
        <v-container class="Layer-Container">
          <slot name="LayerFooter" />
        </v-container>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  layer: boolean
}

export default Vue.extend({
  props: {
    expanded: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    titleEn: {
      type: String,
      required: true
    },
    fullscreen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(): DataType {
    return {
      layer: this.expanded
    }
  },
  watch: {
    expanded(newValue) {
      this.layer = newValue
    }
  }
})
</script>

<style lang="scss" scoped>
.Layer {
  background-color: $color-base-color-07;
  border-radius: 24px 24px 0 0 !important;
  padding: 16px !important;
}
.Layer-CardElements {
  padding: 0 !important;
}
.Layer-CardTitle {
  margin-bottom: 16px;
}
.Layer-CardActions {
  margin-top: 24px;
}
.Layer-CardText {
  padding: 0 !important;
}
.Layer-FormContainer {
  padding: 0 !important;
}
.Layer-Container {
  padding: 0;
}
.Layer-Header {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $color-white;
  border-bottom: 1px solid $color-base-color-01;
  padding: 0 0 4px !important;

  .TitleEn {
    font-size: 12px;
    font-weight: bold;
  }

  .Title {
    font-size: 20px;
  }
}
</style>
