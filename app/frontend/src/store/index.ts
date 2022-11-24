import { api, setToken } from '@/services/api';
import type { TodoType, UserType } from '@/types';
import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  todos: TodoType[];
  user: UserType;
}

export interface Getters {
  getTodos: TodoType[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    todos: [],
    user: {} as UserType,
  },
  mutations: {
    setUser(state, payload: UserType) {
      state.user = payload;
    },
    setTodos(state, payload: TodoType[]) {
      state.todos = payload;
    },
    addTodo(state, payload: TodoType) {
      state.todos = [...state.todos, payload];
    },
    changeTodoState(state, payload: { _id: string; completed: boolean }) {
      state.todos = state.todos.map((todo) => {
        if (todo._id === payload._id) {
          todo.completed = payload.completed;
        }
        return todo;
      });
    },
    deleteTodo(state, payload: string) {
      state.todos = state.todos.filter((todo) => todo._id !== payload);
    },
    editTodo(state, payload: { title: string; _id: string }) {
      state.todos = state.todos.map((todo) => {
        if (todo._id === payload._id) {
          todo.title = payload.title;
        }
        return todo;
      });
    },
  },
  actions: {
    async singIn({ commit }, payload: { email: string; password: string }) {
      const { data } = await api.post<UserType>('/users/sing-in', payload);
      const { _id, name, email, token } = data;

      localStorage.setItem('token', token!);

      commit('setUser', { _id, name, email });

      return data;
    },
    async singUp({ commit }, payload: { name: string; email: string; password: string }) {
      const { data } = await api.post<UserType>('/users/register', payload);
      const { _id, name, email, token } = data;

      localStorage.setItem('token', token!);

      commit('setUser', { _id, name, email });
    },
    logout({ commit }) {
      localStorage.removeItem('token');

      commit('setUser', {} as UserType);
      commit('setTodos', []);
    },
    async userValidate({ commit }, payload: string) {
      setToken(payload);

      const { data } = await api.get<UserType>('/users/validate');
      const { _id, name, email, token } = data;

      commit('setUser', { _id, name, email });

      localStorage.setItem('token', token!);

      return data;
    },
    async getTodos({ commit }) {
      const token = localStorage.getItem('token');

      setToken(token!);

      const { data } = await api.get<TodoType[]>('/todos');

      commit('setTodos', data);

      return data;
    },
    async createTodo({ commit }, payload: string) {
      const token = localStorage.getItem('token');

      setToken(token!);

      const { data } = await api.post<TodoType>('/todos', {
        title: payload,
      });

      commit('addTodo', data);

      return data;
    },
    async changeTodoState({ commit }, payload: { _id: number; completed: boolean }) {
      const token = localStorage.getItem('token');

      setToken(token!);

      const { data } = await api.patch<TodoType>(`/todos/progress/${payload._id}`, {
        completed: payload.completed,
      });

      commit('changeTodoState', payload);

      return data;
    },
    async deleteTodo({ commit }, payload: string) {
      const token = localStorage.getItem('token');

      setToken(token!);

      await api.delete(`/todos/${payload}`);

      commit('deleteTodo', payload);
    },
    async editTodo({ commit }, payload: { title: string; _id: string }) {
      const { data } = await api.patch<TodoType>(`/todos/title/${payload._id}`, {
        title: payload.title,
      });
      commit('editTodo', payload);
      return data;
    },
  },
  getters: {
    sortedTodos(state) {
      const noCompleted = state.todos
        .filter((todo) => !todo.completed)
        .sort(
          (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        );

      const completed = state.todos
        .filter((todo) => todo.completed)
        .sort(
          (a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf(),
        );

      return [...noCompleted, ...completed];
    },
  },
});
