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
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <TodoSpinner v-if="loading" />
      <template v-else>
        <TodoForm />
        <TodoEmpty v-if="isEmpty" />
        <TodoItems v-else />
      </template>
    </div>
  </div>
</template>
