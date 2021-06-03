<template>
  <LoadingView :loading="friendLoad">
    <el-card class="box-card" shadow="always">
      <el-form label-position="left" label-width="80px" :model="friendData">
        <el-form-item label="标题">
          <el-input v-model="friendData.data.title"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="friendData.data.link"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="friendData.data.createDate" disabled></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="friendData.data.updateDate" disabled></el-input>
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
import { FriendLinkResult } from "@/interface/friendLink";
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
    let friendData: Ref<FriendLinkResult> = ref<FriendLinkResult>({
      data: {
        title: "",
        link: "",
        createDate: "",
        updateDate: "",
      }
    });
    let friendLoad = ref(false);
    let edit = ref(false);
    if (id != "0") {
      // 获取详情
      edit.value = true;
      friendLoad.value = true;
      useAsyncRequest({
        method: "get",
        url: `/v1/page-table/${id}`,
      }).then((res) => {
        friendData.value.data = res.data.data;
        friendLoad.value = false;
      });
    }
    const sendPosts = () => {
      const params = {
        title: friendData.value.data.title,
        link: friendData.value.data.link,
        createDate: edit.value ? friendData.value.data.createDate : useFormatDate(new Date()),
        updateDate: useFormatDate(new Date()),
      };
      if (edit.value) {
        useAsyncRequest({
          method: "put",
          url: `/apis/page-table/${id}`,
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
          url: `/apis/page-table`,
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
      friendData,
      friendLoad,
      sendPosts,
    };
  },
});
</script>

<style>
</style>