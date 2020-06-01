<template>
  <div>
    <v-btn @click="addButtonClicked" />
    <v-bottom-sheet v-model="sheet" persistent class="hoge">
      <v-container class="hoge">
        <v-row>
          <v-col class="message"> {{ message }}</v-col>
          <v-col cols="2">
            <span class="abb-button">
              <AddButton
                :icon-size="iconSize"
                @addButtonClicked="addButtonClicked"
              />
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-bottom-sheet>
  </div>
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
      this.sheet = !this.sheet
      this.$emit('addButtonClicked')
    }
  }
})
</script>

<style lang="scss" scoped>
.hoge {
  background-color: $color-base-color-07;
  color: $color-white;
  border-radius: 24px 24px 0 0;
  padding: 0;
}

.message {
  max-width: 90%;
  padding: 1rem 1.5rem;
  align-self: center;
}

.add-button {
  max-width: 20%;
  margin: 0 12px;
  padding: 10px;
  align-self: end;
  float: right;
}
</style>
