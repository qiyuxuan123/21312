import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
    ,
    {
      path: '/addcar',
      name: 'addcar',
      component: () => import('../views/addcar.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main.vue'),
      children: [
        {
          path: '/car',
          name: 'car',
          component: () => import('../views/car.vue')
        }]
    }
  ]
})



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next('/main')
    } else {
      next()
    }
  } else {
    // 没有token
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
