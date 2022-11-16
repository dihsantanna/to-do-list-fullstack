<script setup lang="ts">
import TodoEmpty from '@/components/TodoEmpty.vue';
import TodoForm from '@/components/TodoForm.vue';
import TodoItems from '@/components/TodoItems.vue';
import TodoSpinner from '@/components/TodoSpinner.vue';
</script>
<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <TodoSpinner />
      <TodoForm />
      <TodoItems />
      <TodoEmpty />
    </div>
  </div>
</template>
