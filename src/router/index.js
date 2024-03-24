import { createRouter, createWebHistory } from 'vue-router'

import SignUp from '@/components/SignUp.vue'
import CountriesList from '@/pages/CountriesList.vue'
import CountryDetail from '@/pages/CountryDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // redirect: '/signup'
      redirect: '/countries'
    },
    {
      path: '/signup',
      // name: 'about',
      component: SignUp
    },
    {
      path: '/countries',
      // name: 'about',
      component: CountriesList
    },
    {
      path: '/countries/:countryKey',
      component: CountryDetail
    }
  ]
})

export default router
