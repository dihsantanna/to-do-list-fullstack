<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import { key } from '@/store';
import type { TodoType } from '@/types';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore(key);
const sortedTodos = computed(() => store.getters.sortedTodos as TodoType[]);
</script>
<template>
  <div class="space-y-2">
    <TodoItem v-for="todo in sortedTodos" :key="todo._id" :todo="todo" />
  </div>
</template>
