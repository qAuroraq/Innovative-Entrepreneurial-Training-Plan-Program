import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import UserListView from '../views/UserListView';
import UserProfileView from '../views/UserProfileView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import NotFoundView from '../views/NotFoundView';
import ResultView from '../views/ResultView';
import QueryView from '../views/QueryView';
import ConsultView from '../views/ConsultView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/myspace/userlist/',
    name: 'userlist',
    component: UserListView
  },
  {
    path: '/myspace/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfileView
  },
  {
    path: '/myspace/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/myspace/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/myspace/404/',
    name: '404',
    component: NotFoundView
  },
  {
    path: '/myspace/:catchAll(.*)',
    redirect: "/myspace/404/"
  },
  {
    path: '/myspace/result',
    name: 'result',
    component: ResultView
  },
  {
    path: '/myspace/query',
    name: 'query',
    component: QueryView
  },
  {
    path: '/myspace/consult',
    name: 'consult',
    component: ConsultView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
