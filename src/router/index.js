import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '@/pages/SignUp.vue'
import CountriesList from '@/pages/CountriesList.vue'
import CountryDetail from '@/pages/CountryDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/signup'
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/countries',
      name: 'countries',
      component: CountriesList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/countries/:countryKey',
      name: 'country',
      component: CountryDetail,
      meta: {
        requiresAuth: true
      }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition // если тыкнули назад - то вернемся в то же положение на странице
    }
    return { top: 0, left: 0 }
  }
})

router.beforeEach((to) => {
  const isUserAuth = sessionStorage.getItem('userId') && sessionStorage.getItem('token')

  if (to.meta.requiresAuth && !isUserAuth) {
    return { name: 'signup' }
  }

  return true
})

export default router
