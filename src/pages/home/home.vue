<template>
  <transition-group>
    <LoadingView :loading="CardLoad">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>数据预览</span>
          </div>
        </template>
        <el-row>
          文章数量: {{CardData.data.postsCount}}
        </el-row>
        <el-row>
          分类数量: {{CardData.data.categoriesCount}}
        </el-row>
        <el-row>
          标签数量: {{CardData.data.tagsCount}}
        </el-row>
        <el-row>
          友链数量: {{CardData.data.friendLink.length}}
        </el-row>
      </el-card>
    </LoadingView>
  </transition-group>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Request } from '@/hooks/useRequest'
import LoadingView from '@/components/loading.vue'
import { HomeResult } from '@/interface/home'
export default defineComponent({
  name: 'layout',
  components: {
    LoadingView,
  },
  setup() {
    let {
      loading: CardLoad,
      data: CardData,
      errMessage: CardErr,
    } = Request<HomeResult>({
      method: 'get',
      url: '/v1/page-table',
    })

    return {
      CardLoad,
      CardData,
      CardErr,
      value: new Date(),
    }
  },
})
</script>

<style scoped>
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>