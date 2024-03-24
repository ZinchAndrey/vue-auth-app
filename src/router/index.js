import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '@/components/SignUp.vue'
import CountriesList from '@/pages/CountriesList.vue'
import CountryDetail from '@/pages/CountryDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signup'
      // redirect: '/countries'
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/countries',
      component: CountriesList
    },
    {
      path: '/countries/:countryKey',
      component: CountryDetail
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // если тыкнули назад - то вернемся в то же положение на странице
    }
    return { top: 0, left: 0 }
  }
})

export default router
