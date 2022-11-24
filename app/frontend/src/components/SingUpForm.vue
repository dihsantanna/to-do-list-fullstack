<script setup lang="ts">
import HidePass from '@/assets/hidePass.svg?component';
import ShowPass from '@/assets/showPass.svg?component';
import Spinner from '@/assets/spinner.svg?component';
import { key } from '@/store';
import type { AxiosError } from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const $toast = useToast();
const store = useStore(key);
const router = useRouter();

const showPass = ref(false);
const singUpState = ref({
  name: '',
  email: '',
  password: '',
});
const disableSubmit = ref(true);
const loading = ref(false);

const toggleShowPass = () => {
  showPass.value = !showPass.value;
};

const allFieldsFilledIn = () => {
  const { name, email, password } = singUpState.value;
  const checkName = name.length >= 3;
  const checkEmail = email.length > 6;
  const checkPassword = password.length >= 8;

  disableSubmit.value = !(checkName && checkEmail && checkPassword);
};

watch([singUpState], allFieldsFilledIn, { deep: true });

const singUp = () => {
  loading.value = true;
  $toast.clear();
  store
    .dispatch('singUp', singUpState.value)
    .then(() => {
      $toast.success('<p class="text-black">Cadastro realizado com sucesso!</p>');
      router.push('/to-do-list');
    })
    .catch((error) => {
      $toast.error((error as AxiosError<{ error: string }>).response?.data.error!);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <form
    @submit.prevent="singUp"
    class="flex items-center flex-col gap-4 justify-between px-4 mt-24 mx-auto max-w-md"
  >
    <span class="self-start dark:text-gray-100">Faça o seu cadastro:</span>
    <div
      class="flex items-center bg-gray-100 dark:bg-gray-900 px-2 py-1 border-l border-green-400 rounded-sm w-full"
    >
      <input
        type="text"
        class="bg-gray-100 dark:bg-gray-900 placeholder-gray-900 p-2 dark:placeholder-gray-100 text-gray-900 dark:text-gray-100 font-light focus:outline-none block w-full appearance-none leading-normal"
        placeholder="Qual o seu nome?"
        v-model="singUpState.name"
      />
    </div>
    <div
      class="flex items-center bg-gray-100 dark:bg-gray-900 px-2 py-1 border-l border-green-400 rounded-sm w-full"
    >
      <input
        type="email"
        class="bg-gray-100 dark:bg-gray-900 placeholder-gray-900 p-2 dark:placeholder-gray-100 text-gray-900 dark:text-gray-100 font-light focus:outline-none block w-full appearance-none leading-normal"
        placeholder="Digite o seu e-mail"
        v-model="singUpState.email"
      />
    </div>
    <div
      class="relative flex items-center bg-gray-100 dark:bg-gray-900 px-2 py-1 border-l border-green-400 rounded-sm w-full mb-2"
    >
      <input
        :type="showPass ? 'text' : 'password'"
        class="bg-gray-100 dark:bg-gray-900 placeholder-gray-900 p-2 dark:placeholder-gray-100 text-gray-900 dark:text-gray-100 font-light focus:outline-none block w-full appearance-none leading-normal"
        placeholder="Digite uma senha"
        v-model="singUpState.password"
      />
      <button
        @click="toggleShowPass"
        type="button"
        class="w-6 h-6 flex items-center justify-center"
      >
        <ShowPass v-if="showPass" class="fill-gray-900 dark:fill-gray-100" />
        <HidePass v-else class="fill-gray-900 dark:fill-gray-100" />
      </button>
      <span
        class="absolute text-xs italic text-gray-900 dark:text-gray-200 -bottom-4 left-0 opacity-90"
        >Senha deve possuir de 8 a 24 caracteres.</span
      >
    </div>
    <div class="flex w-full items-end justify-between">
      <button
        type="submit"
        class="w-28 h-10 flex items-center justify-center bg-green-400 hover:bg-green-500 disabled:bg-green-300 disabled:hover:none text-gray-100 font-bold py-2 px-8 rounded-md"
        :disabled="disableSubmit"
      >
        {{ loading ? '' : 'CADASTRAR' }}
        <Spinner v-if="loading" class="w-20 h-6" />
      </button>
      <div class="text-gray-900 dark:text-gray-100 ml-4 text-end">
        Já possui cadastro? <br />
        Faça o seu login
        <router-link class="text-green-400 hover:text-green-500" to="/sing-in">
          aqui
        </router-link>
        !
      </div>
    </div>
  </form>
</template>
