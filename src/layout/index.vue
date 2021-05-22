<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <template #title>文章列表</template>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-edit-outline"></i>
          <template #title>分类列表</template>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-price-tag"></i>
          <template #title>标签列表</template>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-paperclip"></i>
          <template #title>友链列表</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-delete"></i>
          <template #title>回收站</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>王小虎</span>
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
          <a href="https://beian.miit.gov.cn" target="_blank"
            >京ICP备2021014015号-1</a
          >
        </p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { runTime } from "@/hooks/useRunTime";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const item = reactive({
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    });
    const { runTimes } = runTime();
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
      runTimes,
      tableData: Array(20).fill(item),
    };
  },
});
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