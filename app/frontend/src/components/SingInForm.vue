<script setup lang="ts">
import HidePass from '@/assets/hidePass.svg?component';
import ShowPass from '@/assets/showPass.svg?component';
import { ref } from 'vue';
const showPass = ref(false);
const toggleShowPass = () => {
  showPass.value = !showPass.value;
};
</script>
<template>
  <form class="flex items-center flex-col gap-4 justify-between px-4 mt-24">
    <span class="self-start dark:text-gray-100">Faça o seu login:</span>
    <div
      class="flex items-center bg-gray-100 dark:bg-gray-900 px-2 py-1 border-l border-green-400 rounded-sm w-full"
    >
      <input
        type="email"
        class="bg-gray-100 dark:bg-gray-900 placeholder-gray-900 p-2 dark:placeholder-gray-100 text-gray-900 dark:text-gray-100 font-light focus:outline-none block w-full appearance-none leading-normal"
        placeholder="Digite seu e-mail"
      />
    </div>
    <div
      class="flex items-center bg-gray-100 dark:bg-gray-900 px-2 py-1 border-l border-green-400 rounded-sm w-full"
    >
      <input
        :type="showPass ? 'text' : 'password'"
        class="bg-gray-100 dark:bg-gray-900 placeholder-gray-900 p-2 dark:placeholder-gray-100 text-gray-900 dark:text-gray-100 font-light focus:outline-none block w-full appearance-none leading-normal"
        placeholder="Digite sua senha"
      />
      <button
        @click="toggleShowPass"
        type="button"
        class="w-6 h-6 flex items-center justify-center"
      >
        <ShowPass v-if="showPass" class="fill-gray-900 dark:fill-gray-100" />
        <HidePass v-else class="fill-gray-900 dark:fill-gray-100" />
      </button>
    </div>
    <div class="flex w-full items-end justify-between">
      <button
        type="submit"
        class="bg-green-400 hover:bg-green-500 text-gray-100 font-bold py-2 px-8 rounded-md"
      >
        Entrar
      </button>
      <div class="text-gray-900 dark:text-gray-100">
        Cadastre-se
        <router-link class="text-green-400 hover:text-green-500" to="/sing-up">
          aqui
        </router-link>
      </div>
    </div>
  </form>
</template>
