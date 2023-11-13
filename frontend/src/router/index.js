import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/general/NotFound.vue'
import HomeView from '../views/general/HomeView.vue'
import AboutView from '../views/general/AboutView.vue'
import InventoryView from '../views/manager/InventoryView.vue'
import EmploymentView from '../views/manager/EmploymentView.vue'
import CustomerOrderView from '../views/customer/CustomerOrderView.vue'

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
    path: '/inventory',
    name: 'inventory',
    component: InventoryView
  },
  {
    path: '/employment',
    name: 'employment',
    component: EmploymentView
  },  {
    path: '/customer-order',
    name: 'customer-order',
    component: CustomerOrderView
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
