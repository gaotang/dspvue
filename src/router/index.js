import Vue from 'vue'
import Router from 'vue-router'
import { signin } from '@/components/signin'
// import { consult as Consult } from '@/components/consult'
// import { custom as Custom } from '@/components/custom'
// import { dailywork as Dailywork } from '@/components/dailywork'
// import { doctorpower as Doctorpower } from '@/components/doctorpower'
// import { rptservice as Rptservice } from '@/components/rptservice'

const Consult = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../components/consult/Consult.vue'], () => {
    resolve(require('../components/consult/Consult.vue'))
  })
}
const Custom = resolve => {
  require.ensure(['../components/custom/Custom.vue'], () => {
    resolve(require('../components/custom/Custom.vue'))
  })
}
const Dailywork = resolve => {
  require.ensure(['../components/dailywork/Dailywork.vue'], () => {
    resolve(require('../components/dailywork/Dailywork.vue'))
  })
}
const Doctorpower = resolve => {
  require.ensure(['../components/doctorpower/Doctorpower.vue'], () => {
    resolve(require('../components/doctorpower/Doctorpower.vue'))
  })
}
const Rptservice = resolve => {
  require.ensure(['../components/rptservice/Rptservice.vue'], () => {
    resolve(require('../components/rptservice/Rptservice.vue'))
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'signin',
      component: signin
    },
    {
      path: '/consult',
      name: 'consult',
      component: Consult
    },
    {
      path: '/custom',
      name: 'custom',
      component: Custom
    },
    {
      path: '/dailywork',
      name: 'dailywork',
      component: Dailywork
    },
    {
      path: '/doctorpower',
      name: 'doctorpower',
      component: Doctorpower
    },
    {
      path: '/rptservice',
      name: 'rptservice',
      component: Rptservice
    }
  ]
})
