import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Authenticated from '../components/Authenticated.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import AccountForm from '../views/AccountForm.vue'
import SelectAccountType from '../views/SelectAccountType.vue'
import DemographicData from '../views/DemographicData/index.vue'
import BiometricValidation from '../views/BiometricValidation.vue'
import Documentation from '../views/Documentation.vue'


const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/needAuth',
  //   component: NonAuthenticated,
  //   children: [
  //     { path: '/login', component: Login },
  //     { path: '/register', component: Register },
  //   ],
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'select-account-type' },
    children: [
      {
        path: 'select-account-type',
        name: 'select-account-type',
        component: SelectAccountType
      },
      {
        path: 'create-account/:accountType(persona|empresa)',
        name: 'create-account',
        component: AccountForm,
      },
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Authenticated,
    children: [
      {
        path: 'dashboard/:accountType',
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
