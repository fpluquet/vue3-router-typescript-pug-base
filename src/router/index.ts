import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import DatosDemograficos from '../views/DatosDemograficos.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard/:accountType',
    name: 'Dashboard',
    component: Dashboard
  },
  // {
  //   path: '/datos-demograficos',
  //   name: 'DatosDemograficos',
  //   component: DatosDemograficos
  // },
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
