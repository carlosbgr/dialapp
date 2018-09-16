import Vue from 'vue'
import Router from 'vue-router'

import Login from '../app/components/Login.vue'
import MenuFacultativo from '../app/components/MenuFacultativo.vue'
import InsertPaciente from '../app/components/InsertPaciente.vue'

import Firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '*', redirect: '/login'},
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'Login', component: Login},
    {path: '/menuFacultativo', name: 'MenuFacultativo', component: MenuFacultativo, meta: { requiresAuth: true }},
    {path: '/pacientes/insertar', name: 'InsertPaciente', component: InsertPaciente, meta: { requiresAuth: true }}
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = Firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('menuFacultativo')
  else next()
})

export default router
