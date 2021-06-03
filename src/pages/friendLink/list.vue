<template>
  <transition-group>
    <LoadingView :loading="loading">
      <el-row class="main-header"
              justify="start">
        <el-col :span="4">
          <el-button type="primary"
                     @click="addLink">新增</el-button>
        </el-col>
      </el-row>
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
                       @click="handleDelete(scope.row._id, scope.$index)">删除</el-button>
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
import { useAsyncRequest } from '@/hooks/useAsyncReq'
import { ElNotification } from 'element-plus'
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
      router.push(`/FriendLinkDetail/${id}`)
    }
    const handleDelete = (id: string, index: number) => {
      useAsyncRequest({
        method: 'delete',
        url: `/apis/page-table/${id}`,
      }).then(res => {
        ElNotification({
          type: 'success',
          title: res.data.code,
          message: res.data.message,
        })
        data.value.splice(index, 1)
      })
    }
    const addLink = () => {
      router.push('/FriendLinkDetail/0')
    }
    return {
      data,
      loading,
      errMessage,
      handleEdit,
      handleDelete,
      addLink,
    }
  },
})
</script>