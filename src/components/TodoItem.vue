<script setup lang="ts">
import CheckIcon from '@/assets/check.svg?component';
import XIcon from '@/assets/x.svg?component';
import { key } from '@/store';
import type { TodoType } from '@/types';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore(key);

const props = defineProps<{
  todo: TodoType;
}>();

const id = computed(() => props.todo.id);
const title = computed(() => props.todo.title);
const completed = computed(() => props.todo.completed);

const toggleCompleted = () => {
  store.dispatch('changeTodoState', {
    id: id.value,
    completed: !completed.value,
  });
};
</script>
<template>
  <div
    class="bg-gray-300 rounded-sm md:hover:scale-[1.02] md:transition-all md:duration-500"
  >
    <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
      <div class="flex items-center justify-center mr-2">
        <button @click="toggleCompleted">
          <CheckIcon
            :class="`w-4 h-4 ${completed ? 'fill-green-400' : 'fill-gray-400'}`"
          />
        </button>
      </div>

      <div class="w-full">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          :value="title"
          :class="`bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3 ${
            completed ? 'line-through' : ''
          }`"
          :disabled="completed"
        />
      </div>

      <div class="ml-auto flex items-center justify-center">
        <button class="focus:outline-none">
          <XIcon class="w-4 h-4 fill-red-600" />
        </button>
      </div>
    </div>
  </div>
</template>
