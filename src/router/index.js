import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ioSurvey from '@/components/ioSurvey'
import entrySurvey from '@/components/entrySurvey'
import campSurvey from '@/components/campSurvey'
import exitSurvey from '@/components/exitSurvey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home 
    },
    {
      path: '/ioSurvey',
      name: 'ioSurvey',
      component: ioSurvey
    },
    {
      path: '/entrySurvey',
      name: 'entrySurvey',
      component: entrySurvey
    },
    {
      path: '/campSurvey',
      name: 'campSurvey',
      component: campSurvey
    },
    {
      path: '/exitSurvey',
      name: 'exitSurvey',
      component: exitSurvey
    }
  ]
})
