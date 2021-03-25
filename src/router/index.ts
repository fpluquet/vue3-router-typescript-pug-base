import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Authenticated from '../components/Authenticated.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import AccountForm from '../views/Account/AccountForm.vue'
import ContinueRegister from '../views/Account/ContinueRegister.vue'
import CodeInput from '../views/Account/CodeInput.vue'
import SelectAccountType from '../views/Account/SelectAccountType.vue'
import DemographicData from '../views/DemographicData/index.vue'
import BiometricValidation from '../views/BiometricValidation.vue'
import Documentation from '../views/Documentation.vue'
import NotFound from '../views/NotFound.vue'
NotFound


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'select-account-type' },
    children: [
      {
        path: 'account-section/select-account-type',
        name: 'select-account-type',
        component: SelectAccountType
      },
      {
        path: '/account-section/create-account/:accountType(persona|empresa)',
        name: 'create-account',
        component: AccountForm,
      },
      {
        path: '/account-section/code-input/:accountType/:cognitoId',
        name: 'code-input',
        component: CodeInput,
      },
      {
        path: '/account-section/continue-register',
        name: 'continue-register',
        component: ContinueRegister,
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

  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
