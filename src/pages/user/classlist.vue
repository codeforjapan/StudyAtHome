<template>
  <bottom-sheet-layer title="クラス一覧" title-en="CLASS LIST" fullscreen>
    <template v-slot:LayerContents>
      <h1 v-if="!items || items.length < 1">
        {{ $t('pages.user_classlist.no_classes') }}
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
        :is-disabled="!items || items.length < 1"
        theme="primary"
        :text="$t('pages.user_classlist.login_to_class')"
        class="ClassList-Button"
        :is-loading="loading"
        @click="doSelectClassLogin"
      />
      <action-button
        :text="$t('pages.user_classlist.add_class')"
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
      selectedClassId: '',
      loading: false
    }
  },
  methods: {
    async doSelectClassLogin() {
      this.loading = true
      try {
        await vxm.classData.loadClassData(this.selectedClassId)
        await this.$router.push('/edit')
      } catch {
        this.loading = false
      }
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
