<template>
  <bottom-sheet-layer title="クラス一覧" title-en="CLASS LIST" fullscreen>
    <template v-slot:LayerContents>
      <h1 v-if="!items || items.length < 0">
        編集可能なクラスがありません。クラスの登録を行ってください
      </h1>
      <v-list v-else>
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
    </template>
    <template v-slot:LayerFooter>
      <action-button
        theme="primary"
        text="選択クラスでログインする"
        class="ClassList-Button"
        :is-loading="loading"
        @click="doSelectClassLogin"
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
  loading: boolean
}

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton },
  layout: 'background',
  middleware: 'authenticated',
  data(): DataType {
    return {
      items: vxm.user.allowAccess,
      selectedClassId: vxm.user.allowAccess[0].classId,
      loading: false
    }
  },
  methods: {
    doSelectClassLogin() {
      this.loading = true
      vxm.classData
        .loadClassData({
          classId: this.selectedClassId,
          isEditor: true
        })
        .then(() => {
          this.$router.push('/edit')
        })
        .catch(() => {
          this.loading = false
        })
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
