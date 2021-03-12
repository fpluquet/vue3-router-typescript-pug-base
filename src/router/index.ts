import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'

import DemographicDataForm from '../views/DemographicDataForm.vue'
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
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'datos-demograficos',
        name: 'datos-demograficos',
        component: DemographicDataForm
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
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
