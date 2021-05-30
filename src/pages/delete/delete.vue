<template>
  <transition-group>
    <LoadingView :loading="postsLoad">
      <el-table :data="postsData.data">
        <el-table-column prop="title"
                         label="标题"
                         width="140">
        </el-table-column>
        <el-table-column prop="desc"
                         label="描述"
                         width="320">
        </el-table-column>
        <el-table-column prop="createDate"
                         label="创建时间"> </el-table-column>
        <el-table-column prop="updateDate"
                         label="修改时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-refresh-right"
                       @click="handleEdit(scope.row._id)">还原</el-button>
            <el-button type="danger"
                       size="small"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="postsData.countPage"
                     @current-change="handleCurrentChange"></el-pagination>
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
export default defineComponent({
  name: 'layout',
  components: {
    LoadingView,
  },
  setup() {
    const router = useRouter()
    let {
      loading: postsLoad,
      data: postsData,
      errMessage: postsErr,
    } = Request<PostsGet>({
      method: 'get',
      url: '/v1/posts',
      params: {
        page: 0,
        isDelete: 1,
      },
    })
    const handleEdit = (id: string) => {
      useAsyncRequest({
        method: 'post',
        url: `/apis/posts/recovery/${id}`,
      }).then((res) => {
        location.reload()
      })
    }
    const handleDelete = (id: string) => {
      useAsyncRequest({
        method: 'delete',
        url: `/apis/posts/${id}`,
      }).then((res) => {
        location.reload()
      })
    }
    const handleCurrentChange = (val: number) => {
      console.log(typeof val)
      useAsyncRequest({
        method: 'get',
        url: '/v1/posts',
        params: {
          page: val - 1,
          isDelete: 1,
        },
      }).then((res) => {
        postsData.value.data = res.data.data
      })
    }
    return {
      postsData,
      postsLoad,
      postsErr,
      handleEdit,
      handleDelete,
      handleCurrentChange,
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