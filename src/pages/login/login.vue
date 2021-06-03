<template>
  <div class="login-box">
    <div class="form-con">
      <h2>Vue3+element ui plus 博客管理</h2>
      <div class="label">
        <el-input
          placeholder="请输入账号"
          icon="el-icon-user"
          v-model="username"
        >
        </el-input>
      </div>
      <div class="label">
        <el-input
          placeholder="请输入密码"
          icon="el-icon-lock"
          v-model="password"
          show-password
          @keyup.enter="loginFn()"
        >
        </el-input>
      </div>
      <div class="label">
        <el-button class="login-btn" type="primary" @click="loginFn()">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAsyncRequest } from "@/hooks/useAsyncReq";
import { defineComponent, ref } from "@vue/runtime-core";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "login",
  setup() {
    const router = useRouter();
    let username = ref("");
    let password = ref("");
    const loginFn = () => {
      const params = {
        username: username.value,
        password: password.value,
      };
      if (params.username && params.password) {
        useAsyncRequest({
          method: "post",
          url: "/v1/user/login",
          data: params,
        }).then((res) => {
          if(res.data.code == -1){
            ElNotification({
              title: res.data.code,
              message: res.data.data,
              type: 'error',
            })
          }else{
            router.push('/Home')
          }
        }).catch(err => {
          ElNotification({
            message: JSON.stringify(err),
            type: 'error',
          })
        })
      }
    };
    return {
      username,
      password,
      loginFn,
    };
  },
});
</script>
<style scope>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  background: url("../../assets/images/preview.jpg") no-repeat center center;
  background-size: cover;
}
.form-con {
  width: 360px;
  height: 420px;
  margin: 150px auto auto auto;
}
.form-con h2 {
  color: #ffffff;
}
.form-con .label {
  margin: 40px 0;
}
.form-con .login-btn {
  width: 100%;
}
</style>