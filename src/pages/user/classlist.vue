<template>
  <bottom-sheet-layer title="クラス一覧" title-en="CLASS LIST" fullscreen>
    <template v-slot:LayerContents>
      <v-list v-if="items.length > 0">
        <v-radio-group v-model="selectedClassId">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="ClassList-Item"
          >
            <v-radio :value="item.classId">
              <template v-slot:label>
                <span class="ClassList-Label">
                  {{ item.schoolName }} {{ item.className }}
                </span>
              </template>
            </v-radio>
          </v-list-item>
        </v-radio-group>
      </v-list>
      <h1 v-else>
        編集可能なクラスがありません。クラスの登録を行ってください
      </h1>
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
import { vxm } from '@/store'

type DataType = {
  items: Object[]
  selectedClassId: string
}

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton },
  layout: 'background',
  middleware: 'authenticated',
  data(): DataType {
    return {
      items: vxm.user.allowAccess,
      selectedClassId: vxm.user.allowAccess[0].classId
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
