<template>
  <div>
    <bottom-sheet-layer
      :title="$t('pages.user_register_class.title')"
      title-en="STEP 2"
    >
      <template v-slot:LayerContents>
        <dl class="RegisterClass-List">
          <dt class="RegisterClass-ItemTitle">
            {{ $t('pages.user_register_class.labels.school_name') }}
          </dt>
          <dd>
            <input-field
              v-model="schoolName"
              label="school"
              placeholder="おひさま小学校"
              require
            />
          </dd>
          <dt class="RegisterClass-ItemTitle">
            {{ $t('pages.user_register_class.labels.class_name') }}
          </dt>
          <dd>
            <input-field
              v-model="className"
              label="class"
              placeholder="2年B組"
              require
            />
            <span class="RegisterClass-ItemNote">
              {{ $t('pages.user_register_class.labels.class_name_visible') }}
            </span>
          </dd>
        </dl>
      </template>
      <template v-slot:LayerFooter>
        <action-button
          :is-disabled="disableButton"
          :is-loading="loading"
          :text="$t('pages.user_register_class.buttons.register')"
          theme="primary"
          @click="doRegister"
        />
      </template>
    </bottom-sheet-layer>
    <v-snackbar v-model="error" :timeout="5000" absolute color="#C01B61" top>
      {{ $t('pages.user_register_class.error.default') }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BottomSheetLayer from '@/components/BottomSheetLayer.vue'
import ActionButton from '@/components/ActionButton.vue'
import InputField from '@/components/InputField.vue'
import { vxm } from '@/store'

export default Vue.extend({
  components: { BottomSheetLayer, ActionButton, InputField },
  layout: 'background',
  middleware: 'authenticated',
  data() {
    return {
      schoolName: '',
      className: '',
      loading: false,
      error: false
    }
  },
  computed: {
    disableButton(): boolean {
      return !(this.schoolName && this.className)
    }
  },
  methods: {
    doRegister() {
      this.loading = true
      vxm.classData
        .registerClass({
          schoolName: this.schoolName,
          className: this.className
        })
        .then(() => {
          this.loading = false
          this.$router.push('/user/registered')
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.RegisterClass-List {
  padding: 24px 0;
}
.RegisterClass-ItemTitle {
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  margin: 4px 0;
}
.RegisterClass-ItemNote {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: $color-white;
  text-align: center;
  margin: 4px 0;
}
</style>
