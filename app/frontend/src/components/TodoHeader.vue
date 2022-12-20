<script setup lang="ts">
import { key } from '@/store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import DarkModeSelector from './DarkModeSelector.vue';

const router = useRouter();
const store = useStore(key);

const path = computed(() => router.currentRoute.value.path);
const name = computed(() => store.state.user.name);

const logout = () => {
  router.push('/sing-in');
  store.dispatch('logout');
};
</script>
<template>
  <header class="relative w-screen h-16 flex items-center p-4">
    <template v-if="path === '/to-do-list'">
      <div class="text-lg text-gray-900 dark:text-gray-300 italic">
        Olá, <br />
        <span class="font-semibold text-green-400 text-xl">{{ name }}</span>
        !
      </div>
    </template>
    <DarkModeSelector />
    <button @click="logout" type="button"
      class="absolute right-24 text-gray-900 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400"
      v-if="path === '/to-do-list'">
      Sair
    </button>
  </header>
</template>
