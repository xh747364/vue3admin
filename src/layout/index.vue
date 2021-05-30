<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      <MenuView />
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-dropdown>
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>查看</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>阿欢</span>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <p>
          © 2019 — 2021
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-user"></i>
          记昨日书
          <el-divider direction="vertical"></el-divider>
          <span class="SiteRunningTime">该站点运行了： {{ runTimes }}</span>
        </p>
        <p>
          <a href="https://beian.miit.gov.cn"
             target="_blank">京ICP备2021014015号-1</a>
        </p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { runTime } from '@/hooks/useRunTime'
import { defineComponent, reactive } from 'vue'
import MenuView from './components/menu.vue'
export default defineComponent({
  components: {
    MenuView,
  },
  setup() {
    const item = reactive({
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    })
    const { runTimes } = runTime()

    return {
      runTimes,
      tableData: Array(20).fill(item),
    }
  },
})
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-footer {
  margin: 30px 0;
  text-align: center;
}
</style>