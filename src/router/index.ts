import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import About from '@/pages/layout/about.vue'
// import Tags from '@/pages/layout/tags.vue'
// import Th from '@/pages/layout/th.vue'
// import Archive from '@/pages/layout/archive.vue'
import Layout from '../layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
    component: Layout,
    children: [
      {
        path: 'Home',
        component: () => import('../pages/home/home.vue')
      },
      {
        path: 'Detail/:id',
        component: () => import('../pages/postsDetail/postsDetail.vue')
      },
    ]
  },
  // {
  //   path: '/Detail/:id',
  //   name: 'PostsDetail',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'Detail/:id',
  //       component: () => import('../pages/postsDetail/postsDetail.vue')
  //     },
  //   ]
  // },
  // {
  //   path: '/About',
  //   name: 'About',
  //   component: () => About,
  // },
  // {
  //   path: '/Tags',
  //   name: 'Tags',
  //   component: () => Tags,
  // },
  // {
  //   path: '/Th',
  //   name: 'Th',
  //   component: () => Th,
  // },
  // {
  //   path: '/Archive',
  //   name: 'Archive',
  //   component: () => Archive,
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router