import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Registro from '../views/Registro.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Registro' && !localStorage.getItem('wallet')) {
    return next({name: 'Registro'});
  }
  next();
});

export default router;
