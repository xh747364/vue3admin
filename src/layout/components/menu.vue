<template>
  <el-menu :default-active="routeActive"
           class="el-menu-vertical-demo"
           :router="true">
    <el-menu-item :index="item.name"
                  v-for="(item, index) in routeData"
                  :key="index">
      <i :class="item.icon"></i>
      <template #title>{{item.title}}</template>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'
import { defineComponent, reactive, ref } from 'vue'
import { RouteList } from '@/interface/menu'
export default defineComponent({
  setup() {
    const route = useRoute()
    const routeData = reactive<RouteList[]>([
      {
        title: '数据总览',
        icon: 'el-icon-document',
        name: '/Home',
        path: '/Home',
      },
      {
        title: '文章列表',
        icon: 'el-icon-document',
        name: '/Article',
        path: '/Article/Home',
      },
      {
        title: '分类列表',
        icon: 'el-icon-edit-outline',
        name: '/Th',
        path: '/Th/Home',
      },
      {
        title: '标签列表',
        icon: 'el-icon-price-tag',
        name: '/Tags',
        path: '/Tags/Home',
      },
      {
        title: '友链列表',
        icon: 'el-icon-paperclip',
        name: '/FriendLink',
        path: '/FriendLink/Home',
      },
      {
        title: '回收站',
        icon: 'el-icon-delete',
        name: '/Delete',
        path: '/Delete/Home',
      },
    ])
    const routeActive = ref('')
    routeData.forEach(({ path, name }) =>
      path == route.path ? (routeActive.value = name) : false
    )
    return {
      routeActive,
      routeData,
    }
  },
})
</script>
<style>
</style>