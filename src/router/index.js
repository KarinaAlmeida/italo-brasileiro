import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'

const routes = [
  {
    path: '/cadastro',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
