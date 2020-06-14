<template>
  <bottom-sheet-layer title="クラス一覧" title-en="CLASS LIST" fullscreen>
    <template v-slot:LayerContents>
      <v-list>
        <v-radio-group v-model="selectedItem">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="ClassList-Item"
          >
            <v-radio :value="item.num">
              <template v-slot:label>
                <span class="ClassList-Label">{{ item.name }}</span>
              </template>
            </v-radio>
          </v-list-item>
        </v-radio-group>
      </v-list>
    </template>
    <template v-slot:LayerFooter>
      <action-button
        theme="primary"
        text="選択クラスでログインする"
        class="ClassList-Button"
      />
      <action-button
        text="クラスを登録する"
        theme="secondary"
        @click="$router.push('/user/registerClass')"
      />
    </template>
  </bottom-sheet-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomSheetLayer from '@/components/BottomSheetLayer.vue'
import ActionButton from '@/components/ActionButton.vue'

type DataType = {
  items: Object[]
  selectedItem: number
}

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton },
  layout: 'background',
  data(): DataType {
    return {
      items: [
        { name: 'ほげほげ学校１年２組', num: 1 },
        { name: 'ほげほげ学校１年２組', num: 2 },
        { name: 'ほげほげ学校１年２組', num: 3 },
        { name: 'ほげほげ学校１年２組', num: 4 },
        { name: 'ほげほげ学校１年２組', num: 5 },
        { name: 'ほげほげ学校１年２組', num: 6 },
        { name: 'ほげほげ学校１年２組', num: 7 },
        { name: 'ほげほげ学校１年２組', num: 8 },
        { name: 'ほげほげ学校１年２組', num: 9 }
      ],
      selectedItem: 1
    }
  }
})
</script>

<style lang="scss" scoped>
.ClassList-Item {
  &:nth-child(2n) {
    background-color: $color-back-gray;
  }
}
.ClassList-Label {
  color: $color-gray;
}
.ClassList-Button {
  margin-bottom: 16px;
}
</style>
