<template>
  <el-dropdown>
    <i class="el-icon-setting"
        style="margin-right: 15px"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <span>阿欢</span>
</template>
<script lang="ts">
  import { useAsyncRequest } from '@/hooks/useAsyncReq';
import { ElNotification } from 'element-plus';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
  export default defineComponent({
    setup(){
      const router = useRouter()
      const loginOut = () => {
        useAsyncRequest({
          method: 'post',
          url: '/v1/loginOut'
        }).then(res => {
          if(res.data.code == 1000){
            ElNotification({
              type: 'success',
              title: res.data.code,
              message: '退出成功！'
            })
            router.push('/');
          }
        })
      }

      return{
        loginOut
      }
    }
  });
</script>
<style>

</style>