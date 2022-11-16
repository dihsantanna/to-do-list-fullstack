import { api } from '@/services/api';
import type { TodoType } from '@/types';
import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  todos: TodoType[];
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
  },
});
