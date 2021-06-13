<template>
  <transition-group>
    <LoadingView :loading="loading">
      <el-row class="main-header"
              justify="start">
        <el-col :span="4">
          <el-button type="primary"
                     @click="addTh">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="data" type='index'>
        <el-table-column prop="title"
                         label="标题"
                         width="140">
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
      url: '/v1/categories',
    })
    const handleEdit = (id: string) => {
      router.push(`/ThDetail/${id}`)
    }
    const handleDelete = (id: string, index: any) => {
      useAsyncRequest({
        method: 'delete',
        url: `/v1/categories/${id}`,
      }).then(res => {
        ElNotification({
          type: 'success',
          title: res.data.code,
          message: res.data.message,
        })
        data.value.splice(index, 1)
      })
    }
    const addTh = () => {
      router.push('/ThDetail/0')
    }
    return {
      data,
      loading,
      errMessage,
      handleEdit,
      handleDelete,
      addTh,
    }
  },
})
</script>

<style scoped>
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
</style>