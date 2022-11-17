import { api } from '@/services/api';
import type { TodoType } from '@/types';
import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  todos: TodoType[];
}

export interface Getters {
  getTodos: TodoType[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    todos: [],
  },
  mutations: {
    setTodos(state, payload: TodoType[]) {
      state.todos = payload;
    },
    addTodo(state, payload: TodoType) {
      state.todos = [...state.todos, payload];
    },
    changeTodoState(state, payload: { id: number; completed: boolean }) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === payload.id) {
          todo.completed = payload.completed;
        }
        return todo;
      });
    },
    deleteTodo(state, payload: number) {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    editTodo(state, payload: { title: string; id: number }) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === payload.id) {
          todo.title = payload.title;
        }
        return todo;
      });
    },
  },
  actions: {
    async getTodos({ commit }) {
      const { data } = await api.get<TodoType[]>('/todos');
      commit('setTodos', data);
      return data;
    },
    async createTodo({ commit }, payload: string) {
      const { data } = await api.post<TodoType>('/todos', {
        user_id: 1,
        title: payload,
        completed: false,
      });
      commit('addTodo', data);
      return data;
    },
    async changeTodoState({ commit }, payload: { id: number; completed: boolean }) {
      const { data } = await api.patch<TodoType>(`/todos/${payload.id}`, {
        completed: payload.completed,
      });
      commit('changeTodoState', payload);
      return data;
    },
    async deleteTodo({ commit }, payload: number) {
      await api.delete(`/todos/${payload}`);
      commit('deleteTodo', payload);
    },
    async editTodo({ commit }, payload: { title: string; id: number }) {
      const { data } = await api.patch<TodoType>(`/todos/${payload.id}`, {
        title: payload.title,
      });
      commit('editTodo', payload);
      return data;
    },
  },
  getters: {
    sortedTodos(state) {
      return state.todos
        .sort((a, b) => b.id - a.id)
        .sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    },
  },
});