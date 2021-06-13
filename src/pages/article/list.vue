<template>
  <transition-group>
    <LoadingView :loading="postsLoad">
      <el-row class="main-header"
              justify="start">
        <el-col :span="4">
          <el-button type="primary"
                     @click="addArticle">新增</el-button>
        </el-col>

      </el-row>
      <el-table :data="postsData.data"
                v-loading="loading">
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
                       icon="el-icon-view"
                       @click="handleComment(scope.row._id)">查看评论</el-button>
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
      <el-pagination background
                     layout="prev, pager, next"
                     :total="postsData.countPage"
                     @current-change="handleCurrentChange"></el-pagination>
    </LoadingView>
  </transition-group>
  <CommentList :dialogVisible='dialogVisible' :pid="pid" @close="dialogVisible = false" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Request } from '@/hooks/useRequest'
import { PostsGet } from '@/interface/Request'
import LoadingView from '@/components/loading.vue'
import CommentList from './components/commentList.vue'
import { useRouter } from 'vue-router'
import { useAsyncRequest } from '@/hooks/useAsyncReq'
import { ElNotification } from 'element-plus'
export default defineComponent({
  name: 'layout',
  components: {
    LoadingView,
    CommentList,
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
        isDelete: 0,
      },
    })
    let loading = ref(false)
    const handleEdit = (id: string) => {
      router.push(`/ArticleDetail/${id}`)
    }
    const handleDelete = (id: string) => {
      loading.value = true
      useAsyncRequest({
        method: 'post',
        url: `/v1/posts/${id}`,
      }).then(() => {
        loading.value = false
        ElNotification({
          message: '删除成功',
          type: 'success',
        })
        setTimeout(() => {
          location.reload()
        }, 500)
      })
    }
    const addArticle = () => {
      router.push('/ArticleDetail/0')
    }
    const handleCurrentChange = (val: number) => {
      useAsyncRequest({
        method: 'get',
        url: '/v1/posts',
        params: {
          page: val - 1,
          isDelete: 0,
        },
      }).then((res) => {
        postsData.value.data = res.data.data
      })
    }
    let dialogVisible = ref(false);
    let pid = ref('')
    const handleComment = (id: string) => {
      pid.value = id;
      dialogVisible.value = true;
    }
    return {
      postsData,
      postsLoad,
      postsErr,
      handleEdit,
      handleDelete,
      addArticle,
      loading,
      search: '',
      handleCurrentChange,
      handleComment,
      dialogVisible,
      pid,
    }
  },
})
</script>

<style scoped>
.el-pagination {
  text-align: center;
  margin: 20px 0;
}
.main-header {
  display: flex;
}
</style>