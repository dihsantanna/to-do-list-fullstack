import { store } from '@/store';
import SingIn from '@/views/SingInView.vue';
import SingUp from '@/views/SingUpView.vue';
import TodoList from '@/views/TodoListView.vue';
import type { AxiosError } from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

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

router.beforeEach(async (to, _from, next) => {
  const token = localStorage.getItem('token');

  const isSingIn = to.name === 'singIn';
  const isSingUp = to.name === 'singUp';
  const isTodoList = to.name === 'todoList';

  if (isTodoList && !token) {
    next({ name: 'singIn' });
    return;
  }

  try {
    if ((isSingIn || isSingUp) && token) {
      await store.dispatch('userValidate', token);
      next({ name: 'todoList' });
      return;
    }

    if (isTodoList && token) {
      await store.dispatch('userValidate', token);
    }

    next();
  } catch (error) {
    localStorage.removeItem('token');

    if (isTodoList) {
      $toast.error((error as AxiosError<{ error: string }>).response?.data.error!);
      next({ name: 'singIn' });
      return;
    }

    next();
  }
});
