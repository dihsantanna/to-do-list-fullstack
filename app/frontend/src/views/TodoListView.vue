<script setup lang="ts">
import TodoEmpty from '@/components/TodoEmpty.vue';
import TodoForm from '@/components/TodoForm.vue';
import TodoItems from '@/components/TodoItems.vue';
import TodoSpinner from '@/components/TodoSpinner.vue';
import { key } from '@/store';
import { computed, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore(key);

const loading = ref(false);

const isEmpty = computed(() => !store.state.todos.length);

onBeforeMount(() => {
  loading.value = true;
  store.dispatch('getTodos').finally(() => {
    loading.value = false;
  });
});
</script>
<template>
  <TodoSpinner v-if="loading" />
  <template v-else>
    <TodoForm />
    <TodoEmpty v-if="isEmpty" />
    <TodoItems v-else />
  </template>
</template>
