import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FormView from '../views/FormView.vue';
import AdminLogin from '../views/AdminLogin.vue';
import AdminList from '../views/AdminList.vue';
import AdminDetails from '../views/AdminDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: FormView,
    },

    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
    },
    {
      path: '/admin',
      name: 'admin-list',
      component: AdminList,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/:id',
      name: 'admin-details',
      component: AdminDetails,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('admin-auth') === 'true';

  if (to.meta.requiresAuth && !isAuth) {
    return next({ name: 'admin-login' });
  }

  next();
});

export default router;
