import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const routesMap = require.context('@/views', true, /router\.ts$/);
const routes = routesMap.keys().map((key) => (routesMap(key).default || routesMap(key)));
// import demoRouter from '@/demo/router';

const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  // 开发环境引入demo路由
  // routes.push(demoRouter);
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'home',
    },
    ...routes,
  ],
});
