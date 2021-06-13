<template>
  <LoadingView :loading="tagsLoad">
    <el-card class="box-card" shadow="always">
      <el-form label-position="left" label-width="80px" :model="tagsData">
        <el-form-item label="标题">
          <el-input v-model="tagsData.data.title"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="tagsData.data.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="tagsData.data.updateDate" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="sendPosts">{{ edit ? "编辑" : "新增" }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </LoadingView>
</template>

<script lang="ts">
import { useAsyncRequest } from "@/hooks/useAsyncReq";
import { defineComponent, Ref, ref } from "@vue/runtime-core";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useRoute } from "vue-router";
import LoadingView from "@/components/loading.vue";
import { TagsDetailResult } from "@/interface/tags";
import { ElMessage, ElNotification } from "element-plus";
import router from "@/router";
export default defineComponent({
  components: {
    LoadingView,
  },
  setup() {
    // 获取路由参数 id
    const route = useRoute();
    const { id } = route.params;
    // 初始化数据
    let tagsData: Ref<TagsDetailResult> = ref<TagsDetailResult>({
      data: {
        title: "",
        createDate: "",
        updateDate: "",
      }
    });
    let tagsLoad = ref(false);
    let edit = ref(false);
    if (id != "0") {
      // 获取详情
      edit.value = true;
      tagsLoad.value = true;
      useAsyncRequest({
        method: "get",
        url: `/v1/tags/${id}`,
      }).then((res) => {
        tagsData.value.data = res.data.data;
        tagsLoad.value = false;
        console.log(tagsData);
      });
    }
    const sendPosts = () => {
      const params = {
        title: tagsData.value.data.title,
        createDate: edit.value ? tagsData.value.data.createDate : useFormatDate(new Date()),
        updateDate: useFormatDate(new Date()),
      };
      if (edit.value) {
        useAsyncRequest({
          method: "put",
          url: `/v1/tags/${id}`,
          data: params,
        }).then((res) => {
          if(res.data.code == 1000){
            ElMessage.success({
              message: "修改成功",
              type: "success",
            });
            setTimeout(() => {
              router.back();
            }, 200);
          } else {
            ElNotification({
              type: 'error',
              title: res.data.code,
              message: JSON.stringify(res.data.message)
            })
          }
          
        });
      } else {
        useAsyncRequest({
          method: "post",
          url: `/v1/tags`,
          data: params,
        }).then((res) => {
          ElMessage.success({
            message: "添加成功",
            type: "success",
          });
          setTimeout(() => {
            router.back();
          }, 200);
        });
      }
    };

    return {
      edit,
      tagsData,
      tagsLoad,
      sendPosts,
    };
  },
});
</script>

<style>
</style>