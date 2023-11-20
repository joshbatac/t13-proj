import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/general/NotFound.vue'
import HomeView from '../views/general/HomeView.vue'
import AboutView from '../views/general/AboutView.vue'
import CustomerOrderView from '../views/customer/general/CustomerOrderView.vue'
import CashierPortalView from '../views/employee/cashier/CashierPortalView.vue'
import RestockerPortalView from '../views/employee/restocker/RestockerPortalView.vue'
import ManagerPortalView from '../views/employee/manager/ManagerPortalView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },  
  
  {
    path: '/customer-order',
    name: 'customer-order',
    component: CustomerOrderView
  },
  {
    path: '/cashier-portal',
    name: 'cashier-portal',
    component: CashierPortalView
  },
  {
    path: '/restocker-portal',
    name: 'restocker-portal',
    component: RestockerPortalView
  },
  {
    path: '/manager-portal',
    name: 'manager-portal',
    component: ManagerPortalView
  },

  { //404
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
