<script setup lang="ts">
import Spinner from '@/assets/spinner.svg?component';
import { key } from '@/store';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore(key);

const $toast = useToast();

const title = ref('');
const adding = ref(false);
const addTodo = () => {
  $toast.clear();
  if (title.value.length < 3) {
    $toast.warning('<p class="text-black">Tarefa deve conter no mínimo 3 caracteres</p>');
    return;
  }
  adding.value = true;

  store.dispatch('createTodo', title.value).finally(() => {
    adding.value = false;
    title.value = '';
    $toast.success('<p class="text-black">Tarefa adicionada com sucesso!!!</p>');
  });
};
</script>
<template>
  <form
    @submit.prevent="addTodo"
    class="flex items-center justify-between px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
  >
    <input
      v-model="title"
      placeholder="Adicione uma nova tarefa ..."
      type="text"
      class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-4/5 appearance-none leading-normal py-3 pr-3"
    />

    <button
      class="text-green-400 text-xs font-semibold focus:outline-none w-1/5 flex items-center justify-center"
      type="submit"
    >
      {{ !adding ? 'ADICIONAR' : null }}
      <Spinner v-if="adding" class="w-6 h-6" />
    </button>
  </form>
</template>
