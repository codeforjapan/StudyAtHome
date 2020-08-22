<template>
  <base-bottom-sheet-layer
    :title="$t('pages.user_registered.title')"
    title-en="THANK YOU!"
  >
    <template v-slot:LayerContents>
      <div class="Registered-Contents">
        <v-icon color="white" class="Registered-Icon">
          mdi-clipboard-account
        </v-icon>
        <p class="Registered-Text">
          {{ $t('pages.user_registered.labels.new_class_id') }}
        </p>
        <div class="Registered-Id">{{ classId }}</div>
      </div>
    </template>
    <template v-slot:LayerFooter>
      <base-action-button
        theme="primary"
        :text="$t('pages.user_registered.buttons.add_or_edit_lessons')"
        class="Registered-Button"
        @click="$router.push('/edit')"
      />
      <!-- <base-action-button theme="secondary" text="クラスIDを共有する" /> -->
    </template>
  </base-bottom-sheet-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import { vxm } from '@/store'

export default Vue.extend({
  components: { BaseBottomSheetLayer, BaseActionButton },
  layout: 'background',
  middleware: 'authenticated',
  data() {
    return {
      classId: vxm.classData.classId
    }
  }
})
</script>

<style lang="scss" scoped>
.Registered-Contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
}
.Registered-Icon {
  font-size: 50px;
}
.Registered-Text {
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  margin: 24px 0 12px;
}
.Registered-Id {
  max-width: 9em;
  padding: 16px 24px;
  text-align: center;
  background-color: $color-white;
  border: 2px solid $color-base-color-01;
  border-radius: 14px;
  letter-spacing: 0.2em;
  line-height: 1.25;
  font-size: 30px;
  color: $color-gray;
}
.Registered-Button {
  margin-bottom: 16px;
}
</style>
