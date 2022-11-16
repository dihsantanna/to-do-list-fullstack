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
  },
  actions: {
    async getTodos({ commit }) {
      const { data } = await api.get<TodoType[]>('/todos');
      commit('setTodos', data);
      return data;
    },
  },
});
