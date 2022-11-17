<script setup lang="ts">
import MoonIcon from '@/assets/moon.svg?component';
import SunIcon from '@/assets/sun.svg?component';
import { onMounted, ref, watch } from 'vue';

const darkMode = ref(true);

onMounted(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    darkMode.value = true;
  } else {
    document.documentElement.classList.remove('dark');
    darkMode.value = false;
  }

  watch(darkMode, (value) => {
    if (value) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  });
});

const changeTheme = () => {
  darkMode.value = !darkMode.value;
};
</script>
<template>
  <div
    class="absolute right-4 w-max h-max p-1 rounded-full bg-transparent dark:bg-gray-900"
  >
    <button v-if="darkMode" @click="changeTheme" class="flex items-center justify-center">
      <MoonIcon class="w-7 h-7 fill-cyan-400 stroke-none -rotate-45 p-0 m-0" />
    </button>
    <button v-else @click="changeTheme" class="flex items-center justify-center">
      <SunIcon class="w-8 h-8 fill-amber-400 p-0 m-0" />
    </button>
  </div>
</template>
