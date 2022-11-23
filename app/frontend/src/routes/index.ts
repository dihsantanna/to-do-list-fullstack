import SingIn from '@/views/SingInView.vue';
import SingUp from '@/views/SingUpView.vue';
import TodoList from '@/views/TodoListView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/sing-in',
  },
  {
    path: '/sing-in',
    name: 'singIn',
    component: SingIn,
  },
  {
    path: '/sing-up',
    name: 'singUp',
    component: SingUp,
  },
  {
    path: '/to-do-list',
    name: 'todoList',
    component: TodoList,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
