// Composables
import { createRouter, createWebHistory } from 'vue-router'
import UserEditView from '@/views/users/UserEditView.vue'
import UserCreateView from '@/views/users/UserCreateView.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/users/UserView.vue')
      },
      {
        path: 'users/create',
        name: 'userCreate',
        component: UserCreateView
      },
      {
        path: 'users/:id/edit',
        name: 'userEdit',
        component: UserEditView
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
