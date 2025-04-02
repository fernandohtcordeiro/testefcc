import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import ClientsPage from '../pages/ClientsPage.vue'
import ClientFormPage from '../pages/ClientFormPage.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/clientes', component: ClientsPage },
  { path: '/cliente/novo', component: ClientFormPage },
  { path: '/cliente/editar/:id', component: ClientFormPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
