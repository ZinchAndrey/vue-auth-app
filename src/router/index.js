import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '@/components/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signup'
    },
    {
      path: '/signup',
      name: 'about',
      component: SignUp
    }
  ]
})

export default router
