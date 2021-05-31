<template>
  <base-bottom-sheet-layer
    :title="$t('pages.user_classlist.title')"
    title-en="CLASS LIST"
    fullscreen
  >
    <template #LayerContents>
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
              <template #label>
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
    <template #LayerFooter>
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
        @click="$router.push(localePath('/user/registerClass'))"
      />
    </template>
  </base-bottom-sheet-layer>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseBottomSheetLayer from '@/components/BaseBottomSheetLayer.vue'
import BaseActionButton from '@/components/BaseActionButton.vue'
import { withSSRContext } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { vxm } from '@/store'
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
    const { API, Auth } = withSSRContext()
    const user = await Auth.currentAuthenticatedUser()
    const listClasssSimple = /* GraphQL */ `
      query ListClasss(
        $filter: ModelClassFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listClasss(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            school {
              name
            }
            className
          }
          nextToken
        }
      }
    `
    const result = (await API.graphql({
      query: listClasssSimple,
      variables: {
        filter: { owner: { eq: user.username } },
      },
    })) as GraphQLResult<ListClasssQuery>
    this.items = (result?.data?.listClasss?.items as any[]).map((item) => {
      return {
        classId: item.id,
        schoolName: item.school.name,
        className: item.className,
      }
    })
  },
  methods: {
    async doSelectClassLogin() {
      this.loading = true
      try {
        await vxm.classData.loadClassData(this.selectedClassId)
        await this.$router.push(this.localePath('/edit'))
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
