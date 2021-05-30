<template>
  <LoadingView :loading="postsLoad && tagsLoad">
    <el-card class="box-card"
             shadow="always">
      <el-form label-position="left"
               label-width="80px"
               :model="postsData">
        <el-form-item label="标题">
          <el-input v-model="postsData.data.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="postsData.data.desc"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="postsData.data.createDate"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="postsData.data.updateDate"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="postsData.data.categories"
                     multiple
                     collapse-tags
                     placeholder="请选择">
            <el-option v-for="item in categoriesData"
                       :key="item.title"
                       :label="item.title"
                       :value="item.title">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="postsData.data.tags"
                     multiple
                     collapse-tags
                     placeholder="请选择">
            <el-option v-for="item in tagsData"
                       :key="item.title"
                       :label="item.title"
                       :value="item.title">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <v-md-editor v-model="postsData.data.content"
                       height="400px"
                       :disabled-menus="[]"
                       @upload-image="handleUploadImage"></v-md-editor>
        </el-form-item>
        <el-form-item>
          <el-button @click="sendPosts">{{edit?'编辑': '新增'}}</el-button>
        </el-form-item>
      </el-form>
      <!-- <v-md-preview :text="htmlDecode(data.data.content)"></v-md-preview> -->
    </el-card>
  </LoadingView>
</template>

<script lang="ts">
import { Request } from '@/hooks/useRequest'
import { useAsyncRequest } from '@/hooks/useAsyncReq'
import { defineComponent, Ref, ref, ToRefs } from '@vue/runtime-core'
import { htmlDecode, htmlEncode } from '@/hooks/useHTMLAnalysis'
import { useRoute } from 'vue-router'
import LoadingView from '@/components/loading.vue'
import { PostsDefalut } from '@/interface/PostsDetail'
import { ElMessage } from 'element-plus'
import router from '@/router'
export default defineComponent({
  components: {
    LoadingView,
  },
  setup() {
    // 获取路由参数 id
    const route = useRoute()
    const { id } = route.params
    // 初始化数据
    let postsData: Ref<PostsDefalut>
    let postsLoad = ref(true)
    let edit = ref(true)
    if (id != '0') {
      // 获取文章详情
      let articleResult = Request({
        method: 'get',
        url: `/v1/posts/${id}`,
      })

      postsData = articleResult.data
      postsLoad = articleResult.loading
      console.log(postsData)
      edit.value = true
    } else {
      postsData = ref<PostsDefalut>({
        data: {
          title: '',
          desc: '',
          content: '',
          categories: [],
          tags: [],
          createDate: '',
          updateDate: '',
        },
      })
      postsLoad.value = false
      edit.value = false
    }
    const getContent = (text: string) => {
      postsData.value.data.content = htmlEncode(text)
    }
    const { loading: tagsLoad, data: tagsData } = Request({
      method: 'get',
      url: `/v1/tags`,
    })
    const { loading: categoriesLoad, data: categoriesData } = Request({
      method: 'get',
      url: `/v1/categories`,
    })

    const handleUploadImage = (
      event: MouseEvent,
      insertImage: any,
      files: File
    ) => {
      console.log(event, typeof insertImage, files)
      insertImage({
        url: '',
        desc: '标题',
        // width: 'auto',
        // height: 'auto',
      })
    }

    const sendPosts = () => {
      const params = {
        title: postsData.value.data.title,
        categories: postsData.value.data.categories,
        tags: postsData.value.data.tags,
        content: htmlEncode(postsData.value.data.content),
        desc: postsData.value.data.desc,
        createDate: edit.value ? postsData.value.data.createDate : new Date(),
        updateDate: new Date(),
      }
      if (edit.value) {
        useAsyncRequest({
          method: 'put',
          url: `/apis/posts/${id}`,
          data: params,
        }).then((res) => {
          ElMessage.success({
            message: '修改成功',
            type: 'success',
          })
          setTimeout(() => {
            router.back()
          }, 200)
        })
      } else {
        useAsyncRequest({
          method: 'post',
          url: `/apis/posts`,
          data: params,
        }).then((res) => {
          ElMessage.success({
            message: '添加成功',
            type: 'success',
          })
          setTimeout(() => {
            router.back()
          }, 200)
        })
      }
    }

    return {
      edit,
      postsData,
      postsLoad,
      htmlDecode,
      getContent,
      handleUploadImage,
      sendPosts,
      tagsLoad,
      tagsData,
      categoriesLoad,
      categoriesData,
    }
  },
})
</script>

<style>
</style>