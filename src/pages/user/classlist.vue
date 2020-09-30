<template>
  <base-bottom-sheet-layer
    :title="$t('pages.user_classlist.title')"
    title-en="CLASS LIST"
    fullscreen
  >
    <template v-slot:LayerContents>
      <div v-if="!items || items.length < 1" class="noClass">
        <h1>
          {{ $t('pages.user_classlist.no_classes') }}
        </h1>
      </div>
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
                  {{ item.schoolName }} {{ item.className }} （{{
                    item.classId
                  }}）
                </span>
              </template>
            </v-radio>
          </v-list-item>
        </v-radio-group>
      </v-list>
    </template>
    <template v-slot:LayerFooter>
      <base-action-button
        :is-disabled="!items || items.length < 1"
        theme="primary"
        :text="$t('pages.user_classlist.login_to_class')"
        class="ClassList-Button"
        :is-loading="loading"
        @click="doSelectClassLogin"
      />
      <base-action-button
        :text="$t('pages.user_classlist.add_class')"
        theme="secondary"
        @click="$router.push('/user/registerClass')"
      />
    </template>
  </base-bottom-sheet-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { vxm } from '@/store'
import { listClasss } from '@/graphql/queries'
import { ListClasssQuery } from '@/API'

type DataType = {
  items: Object[]
  selectedClassId: string
  loading: boolean
}

export default Vue.extend({
  components: { BaseBottomSheetLayer, BaseActionButton },
  layout: 'background',
  middleware: 'authenticated',
  data(): DataType {
    return {
      items: [],
      selectedClassId: '',
      loading: false,
    }
  },
  async created() {
    const user = await Auth.currentAuthenticatedUser()
    const result = (await API.graphql(
      graphqlOperation(listClasss, {
        filter: { owner: { eq: user.username } },
      })
    )) as GraphQLResult<ListClasssQuery>
    this.items = (result?.data?.listClasss?.items as any[]).map((item) => {
      return {
        classId: item.id,
        schoolName: item.schoolName,
        className: item.className,
      }
    })
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
    },
  },
})
</script>

<style lang="scss" scoped>
.noClass {
  height: 100%;
  color: $color-white;
  display: flex;
  align-items: center;
  text-align: center;
  h1 {
    width: 100%;
    font-size: 21px;
  }
}
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
