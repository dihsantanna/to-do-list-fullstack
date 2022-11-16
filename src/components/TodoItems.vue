<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import { key } from '@/store';
import { useStore } from 'vuex';

const store = useStore(key);
</script>
<template>
  <div class="space-y-2">
    <TodoItem v-for="todo in store.state.todos" :key="`todo-${todo.id}`" :todo="todo" />
  </div>
</template>
