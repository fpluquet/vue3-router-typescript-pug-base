import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'

import DemographicData from '../views/DemographicData/index.vue'
import BiometricValidation from '../views/BiometricValidation.vue'
import Documentation from '../views/Documentation.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard/:accountType',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'datos-demograficos',
        name: 'datos-demograficos',
        component: DemographicData
      },
      {
        path: 'validacion-biometrica',
        name: 'validacion-biometrica',
        component: BiometricValidation,
      },
      {
        path: 'documentacion',
        name: 'documentation',
        component: Documentation,
      },
    ]
  },

  // {
  //   path: "/:catchAll(.*)",
  //   name: 'NotFound',
  //   component: NotFound,
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
