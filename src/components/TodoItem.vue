<script setup lang="ts">
import CheckIcon from '@/assets/check.svg?component';
import XIcon from '@/assets/x.svg?component';
</script>
<template>
  <div class="bg-gray-300 rounded-sm">
    <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
      <div class="flex items-center justify-center mr-2">
        <button>
          <CheckIcon class="w-4 h-4 fill-gray-400" />
        </button>
      </div>

      <div class="w-full">
        <input
          type="text"
          placeholder="Digite a sua tarefa"
          value="Estudar Vue 3"
          class="bg-gray-300 placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3"
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
