import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Authenticated from '../components/Authenticated.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import AccountForm from '../views/Account/AccountForm.vue'
import ContinueRegister from '../views/Account/ContinueRegister.vue'
import CodeInput from '../views/Account/CodeInput.vue'
import SelectAccountType from '../views/Account/SelectAccountType.vue'
import GeneralData from '../views/GeneralData.vue'
import Localization from '../views/Localization.vue'
import BiometricValidation from '../views/BiometricValidation.vue'
import NotFound from '../views/NotFound.vue'
import { ROUTE_DG_NAME, ROUTE_LOC_NAME, ROUTE_VB_NAME, ROUTE_DOC_NAME, SECOND_WIZARD_STEP, FIRST_WIZARD_STEP, THIRD_WIZARD_STEP } from '@/utils/constants';



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
        path: '/account-section/code-input/:accountType(persona|empresa)/:cognitoId',
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
    path: '/auth/:cognitoId',
    name: 'Auth',
    component: Authenticated,
    children: [
      {
        path: 'dashboard/:accountType(persona|empresa)',
        name: 'Dashboard',
        component: Dashboard,
        children: [
          {
            path: 'datos-generales',
            name: ROUTE_DG_NAME,
            meta: { next: ROUTE_LOC_NAME, wizardStep: FIRST_WIZARD_STEP },
            component: GeneralData
          },
          {
            path: 'localizacion',
            name: ROUTE_LOC_NAME,
            meta: { next: ROUTE_VB_NAME, wizardStep: SECOND_WIZARD_STEP },
            component: Localization,
          },
          {
            path: 'validacion-biometrica',
            name: ROUTE_VB_NAME,
            meta: { next: ROUTE_DOC_NAME, wizardStep: THIRD_WIZARD_STEP },
            component: BiometricValidation,
          },
          // {
          //   path: 'documentacion',
          //   name: ROUTE_DOC_NAME,
          //   component: Documentation,
          // },
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
