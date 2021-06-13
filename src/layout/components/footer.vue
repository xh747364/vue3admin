<template>
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
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { runTime } from '@/hooks/useRunTime'
export default defineComponent({
  setup() {
    const { runTimes } = runTime()
    return {
      runTimes,
    }
  },
});
</script>
<style>
</style>