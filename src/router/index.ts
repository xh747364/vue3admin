import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import About from '@/pages/layout/about.vue'
// import Tags from '@/pages/layout/tags.vue'
// import Th from '@/pages/layout/th.vue'
// import Archive from '@/pages/layout/archive.vue'
import Layout from '../layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../pages/login/login.vue'),
  },
  {
    path: '/',
    redirect: '/Login',
    component: Layout,
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('../pages/home/home.vue'),
      },
      // 文章列表
      {
        path: 'Article',
        name: 'Article',
        component: () => import('../pages/article/list.vue')
      },
      // 文章详情
      {
        path: 'ArticleDetail/:id',
        name: 'ArticleDetail',
        component: () => import('../pages/article/detail.vue')
      },
      // 分类列表
      {
        path: 'Th',
        name: 'Th',
        component: () => import('../pages/th/list.vue')
      },
      // 分类详情
      {
        path: 'ThDetail/:id',
        name: 'ThDetail',
        component: () => import('../pages/th/detail.vue')
      },
      // 标签列表
      {
        path: 'Tags',
        name: 'Tags',
        component: () => import('../pages/tags/list.vue')
      },
      // 标签详情
      {
        path: 'TagsDetail/:id',
        name: 'TagsDetail',
        component: () => import('../pages/tags/detail.vue')
      },
      // 友链列表
      {
        path: 'FriendLink',
        name: 'FriendLink',
        component: () => import('../pages/friendLink/list.vue')
      },
      // 友链详情
      {
        path: 'FriendLinkDetail/:id',
        name: 'FriendLinkDetail',
        component: () => import('../pages/friendLink/detail.vue')
      },
      // 回收站
      {
        path: 'Delete',
        name: 'Delete',
        component: () => import('../pages/delete/list.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
