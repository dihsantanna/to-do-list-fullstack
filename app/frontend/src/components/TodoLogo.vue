<script setup lang="ts">
import CheckLogo from '@/assets/check.svg?component';
</script>
<template>
  <div class="flex items-center justify-center w-80 mx-auto">
    <CheckLogo
      class="w-10 h-10 animate-checkmark fill-green-400 stroke-gray-900 dark:stroke-gray-100"
    />
    <span class="text-gray-900 dark:text-gray-100 font-semibold font-mono text-2xl ml-2">
      to do list
    </span>
  </div>
</template>
