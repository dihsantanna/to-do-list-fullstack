import { api } from '@/services/api';
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
    changeTodoState(state, payload: { _id: number; completed: boolean }) {
      state.todos = state.todos.map((todo) => {
        if (todo._id === payload._id) {
          todo.completed = payload.completed;
        }
        return todo;
      });
    },
    deleteTodo(state, payload: number) {
      state.todos = state.todos.filter((todo) => todo._id !== payload);
    },
    editTodo(state, payload: { title: string; _id: number }) {
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
      const { data } = await api.get<UserType>('/users/validate', {
        headers: {
          Authorization: payload,
        },
      });

      const { _id, name, email, token } = data;
      commit('setUser', { _id, name, email });

      localStorage.setItem('token', token!);

      return data;
    },
    async getTodos({ commit }) {
      const { data } = await api.get<TodoType[]>('/todos');
      commit('setTodos', data);
      return data;
    },
    async createTodo({ commit }, payload: string) {
      const { data } = await api.post<TodoType>('/todos', {
        userId: 1,
        title: payload,
        completed: false,
      });
      commit('addTodo', data);
      return data;
    },
    async changeTodoState({ commit }, payload: { _id: number; completed: boolean }) {
      const { data } = await api.patch<TodoType>(`/todos/${payload._id}`, {
        completed: payload.completed,
      });
      commit('changeTodoState', payload);
      return data;
    },
    async deleteTodo({ commit }, payload: number) {
      await api.delete(`/todos/${payload}`);
      commit('deleteTodo', payload);
    },
    async editTodo({ commit }, payload: { title: string; _id: number }) {
      const { data } = await api.patch<TodoType>(`/todos/${payload._id}`, {
        title: payload.title,
      });
      commit('editTodo', payload);
      return data;
    },
  },
  getters: {
    sortedTodos(state) {
      return state.todos
        .sort((a, b) => b._id - a._id)
        .sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    },
  },
});
