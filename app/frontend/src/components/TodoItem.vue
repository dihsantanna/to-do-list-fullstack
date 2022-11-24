<script setup lang="ts">
import CheckIcon from '@/assets/check.svg?component';
import Spinner from '@/assets/spinner.svg?component';
import XIcon from '@/assets/x.svg?component';
import { key } from '@/store';
import type { TodoType } from '@/types';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const store = useStore(key);

const $toast = useToast();

const props = defineProps<{
  todo: TodoType;
}>();

const id = computed(() => props.todo._id);
const title = ref(props.todo.title);
const completed = computed(() => props.todo.completed);
const deleting = ref(false);
const changingStatus = ref(false);

const toggleCompleted = () => {
  changingStatus.value = true;
  store
    .dispatch('changeTodoState', {
      _id: id.value,
      completed: !completed.value,
    })
    .finally(() => {
      changingStatus.value = false;
    });
};

const deleteTodo = () => {
  deleting.value = true;
  store.dispatch('deleteTodo', id.value).finally(() => {
    deleting.value = false;
    $toast.success('<p class="text-black">Tarefa deletada com sucesso!</p>');
  });
};

const editTodo = () => {
  if (title.value.length < 3) {
    $toast.warning('<p class="text-black">Tarefa deve conter no mínimo 3 caracteres</p>');
    return;
  }

  if (title.value !== props.todo.title) {
    store.dispatch('editTodo', {
      _id: id.value,
      title: title.value,
    });
    $toast.success('<p class="text-black">Tarefa editada com sucesso!</p>');
    return;
  }
};
</script>
<template>
  <div
    class="relative bg-gray-900 dark:bg-gray-100 rounded-sm md:hover:scale-[1.02] md:transition-all md:duration-500"
  >
    <div
      class="flex items-center px-4 py-3 border-b border-gray-600 dark:border-gray-400 last:border-b-0"
    >
      <div class="flex items-center justify-center mr-2">
        <Spinner v-if="changingStatus" class="w-6 h-6 absolute -left-9 dark:opacity-40" />
        <button @click="toggleCompleted">
          <CheckIcon
            :class="`w-4 h-4 ${completed ? 'fill-green-400' : 'fill-gray-400'}`"
          />
        </button>
      </div>

      <div class="w-full">
        <input
          @keyup.enter="editTodo"
          @blur="editTodo"
          v-model="title"
          type="text"
          placeholder="Digite a sua tarefa"
          :class="`bg-gray-900 dark:bg-gray-100 placeholder-gray-900 dark:placeholder-gray-500 text-gray-100 dark:text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3 ${
            completed ? 'line-through' : ''
          }`"
          :disabled="completed"
        />
      </div>

      <div class="ml-auto flex items-center justify-center">
        <button @click="deleteTodo" class="focus:outline-none" :disabled="deleting">
          <XIcon v-if="!deleting" class="w-4 h-4 fill-red-600" />
          <Spinner v-else class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>
