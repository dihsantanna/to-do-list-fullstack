<script setup lang="ts">
import { RouterView } from 'vue-router';
import TodoHeader from './components/TodoHeader.vue';
</script>

<template>
  <TodoHeader />
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <RouterView />
    </div>
  </div>
</template>
