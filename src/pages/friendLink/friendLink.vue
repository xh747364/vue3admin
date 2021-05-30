<template>
  <transition-group>
    <LoadingView :loading="loading">
      <el-table :data="data.data.friendLink">
        <el-table-column prop="title"
                         label="标题"
                         width="140">
        </el-table-column>
        <el-table-column prop="link"
                         label="链接">
        </el-table-column>
        <el-table-column prop="createDate"
                         label="创建时间"> </el-table-column>
        <el-table-column prop="updateDate"
                         label="修改时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-edit-outline"
                       @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button type="danger"
                       size="small"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </LoadingView>
  </transition-group>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Request } from '@/hooks/useRequest'
import { PostsGet } from '@/interface/Request'
import LoadingView from '@/components/loading.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'layout',
  components: {
    LoadingView,
  },
  setup() {
    const router = useRouter()
    let { loading, data, errMessage } = Request<PostsGet>({
      method: 'get',
      url: '/v1/page-table',
    })
    const handleEdit = (id: string) => {
      router.push(`/Detail/${id}`)
    }
    const handleDelete = (id: string) => {
      Request({
        method: 'post',
        url: `/apis/posts/${id}`,
      })
      // location.reload()
    }
    return {
      data,
      loading,
      errMessage,
      handleEdit,
      handleDelete,
    }
  },
})
</script>