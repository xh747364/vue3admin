import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import About from '@/pages/layout/about.vue'
// import Tags from '@/pages/layout/tags.vue'
// import Th from '@/pages/layout/th.vue'
// import Archive from '@/pages/layout/archive.vue'
import Layout from '../layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/login.vue'),
  },
  {
    path: '/',
    redirect: '/Home',
    component: Layout,
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('../pages/home/home.vue'),
      },
      {
        path: 'Detail/:id',
        name: 'Detail',
        component: () => import('../pages/articleDetail/articleDetail.vue')
      },
    ]
  },
  {
    path: '/Article',
    name: 'Article',
    redirect: '/Article/Home',
    component: Layout,
    children: [
      {
        path: 'Home',
        name: 'ArticleHome',
        component: () => import('../pages/article/article.vue')
      },
      {
        path: 'Article/Detail/:id',
        name: 'ArticleDetail',
        component: () => import('../pages/articleDetail/articleDetail.vue')
      },
    ]
  },
  {
    path: '/Th',
    name: 'Th',
    redirect: '/Th/Home',
    component: Layout,
    children: [
      {
        path: 'Home',
        name: 'ThHome',
        component: () => import('../pages/th/th.vue')
      },
      {
        path: 'Detail/:id',
        name: 'ThDetail',
        component: () => import('../pages/articleDetail/articleDetail.vue')
      },
    ]
  },
  {
    path: '/Tags',
    name: 'Tags',
    redirect: '/Tags/Home',
    component: Layout,
    children: [
      {
        path: 'Home',
        name: 'TagsHome',
        component: () => import('../pages/tags/tags.vue')
      },
      {
        path: 'Detail/:id',
        name: 'TagsDetail',
        component: () => import('../pages/articleDetail/articleDetail.vue')
      },
    ]
  },
  {
    path: '/FriendLink',
    name: 'FriendLink',
    redirect: '/FriendLink/Home',
    component: Layout,
    children: [
      {
        path: 'Home',
        name: 'FriendLinkHome',
        component: () => import('../pages/friendLink/friendLink.vue')
      },
      {
        path: 'Detail/:id',
        name: 'FriendLinkDetail',
        component: () => import('../pages/articleDetail/articleDetail.vue')
      },
    ]
  },
  {
    path: '/Delete',
    name: 'Delete',
    redirect: '/Delete/Home',
    component: Layout,
    children: [
      {
        path: 'Home',
        name: 'DeleteHome',
        component: () => import('../pages/delete/delete.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
