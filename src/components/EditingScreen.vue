<template>
  <v-bottom-sheet v-model="screen" persistent scrollable>
    <v-card class="EditingScreen">
      <v-card-title class="EditingScreen-CardElements">
        <v-container class="EditingScreen-Container">
          <div class="EditingScreen-Header">
            <span class="En">CREATE TIMETABLE</span>
            <h2 class="Title">時間割作成</h2>
          </div>
        </v-container>
      </v-card-title>
      <v-card-text class="EditingScreen-CardText">
        <v-container class="EditingScreen-FormContainer">
          <editing-screen1 v-show="page === 1" />
          <editing-screen2 v-show="page === 2" />
          <editing-screen3 v-show="page === 3" />
          <editing-screen4 v-show="page === 4" />
        </v-container>
      </v-card-text>
      <v-card-actions class="EditingScreen-CardElements">
        <v-container class="EditingScreen-Container">
          <div class="EditingScreen-Footer">
            <div class="EditingScreen-Paging">
              <v-btn color="white" fab :disabled="isDisabled" @click="goBack">
                <v-icon color="#0071c2" large>mdi-chevron-left</v-icon>
              </v-btn>
              <span class="PagingNumber">{{ page }}/4</span>
              <v-btn
                color="white"
                fab
                :disabled="isDisabled"
                @click="goForward"
              >
                <v-icon color="#0071c2" large>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <div class="EditingScreen-ActionButtons">
              <action-button
                class="Button"
                theme="transparent"
                text="キャンセル"
              />
              <action-button
                class="Button"
                theme="primary"
                text="保存する"
                :is-disabled="isDisabled"
              />
            </div>
          </div>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import EditingScreen1 from '@/components/EditingScreen1.vue'
import EditingScreen2 from '@/components/EditingScreen2.vue'
import EditingScreen3 from '@/components/EditingScreen3.vue'
import EditingScreen4 from '@/components/EditingScreen4.vue'

type DataType = {
  screen: boolean
  isDisabled: boolean
  page: number
}

export default Vue.extend({
  components: {
    ActionButton,
    EditingScreen1,
    EditingScreen2,
    EditingScreen3,
    EditingScreen4
  },
  props: {
    expanded: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(): DataType {
    return {
      screen: this.expanded,
      isDisabled: false,
      page: 1
    }
  },
  watch: {
    expanded(newValue) {
      this.screen = newValue
    }
  },
  methods: {
    goForward(): Number {
      return this.page < 4 ? (this.page += 1) : 4
    },
    goBack(): Number {
      return this.page > 1 ? (this.page -= 1) : 1
    }
  }
})
</script>

<style lang="scss" scoped>
.EditingScreen {
  background-color: $color-base-color-07;
  border-radius: 24px 24px 0 0 !important;
  padding: 16px;
}
.EditingScreen-CardElements {
  padding: 0 !important;
}
.EditingScreen-CardText {
  padding: 16px 8px 0 0 !important;
}
.EditingScreen-FormContainer {
  padding: 0 !important;
}
.EditingScreen-Container {
  padding: 0;
}
.EditingScreen-Header {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $color-white;
  border-bottom: 1px solid $color-base-color-01;
  padding: 0 0 4px !important;

  .En {
    font-size: 12px;
    font-weight: bold;
  }

  .Title {
    font-size: 20px;
  }
}
.EditingScreen-Paging {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;

  .PagingNumber {
    font-size: 18px;
    color: $color-white;
  }
}
.EditingScreen-Form {
  padding: 16px 16px 0 0 !important;
}
.EditingScreen-Footer {
  border-top: 1px solid $color-base-color-01;
}
.EditingScreen-ActionButtons {
  display: flex;
  justify-content: space-between;

  .Button {
    flex: 0 1 48%;
  }
}
</style>
