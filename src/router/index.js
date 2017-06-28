import Vue from 'vue'
import Router from 'vue-router'
import { consult } from '@/components/consult'
import { custom } from '@/components/custom'
import { dailywork } from '@/components/dailywork'
import { doctorpower } from '@/components/doctorpower'
import { rptservice } from '@/components/rptservice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/consult',
      name: 'consult',
      component: consult
    },
    {
      path: '/custom',
      name: 'custom',
      component: custom
    },
    {
      path: '/dailywork',
      name: 'dailywork',
      component: dailywork
    },
    {
      path: '/doctorpower',
      name: 'doctorpower',
      component: doctorpower
    },
    {
      path: '/rptservice',
      name: 'rptservice',
      component: rptservice
    }
  ]
})
