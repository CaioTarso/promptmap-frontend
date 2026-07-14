<template>
  <div class="fixed inset-0 bg-black/40 z-50" @click.self="$emit('close')">
    <div class="flex items-center justify-center h-screen">
      <div class="relative w-full max-w-md bg-[#D9D9D9] text-gray-900 rounded-2xl shadow-2xl p-8">

        <figure>
          <img :src="logo" alt="Logo PromptMAP" class="w-10 h-13 mx-auto mb-4" />
        </figure>

        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-700 hover:text-black hover:bg-zinc-400 rounded-sm cursor-pointer transition-colors"
        >
          <X class="w-6 h-6" />
        </button>

        <h2 class="text-1xl font-bold text-center mb-6">Crie sua conta no PromptMAP</h2>

        <div v-if="authStore.error.length" class="mb-4 space-y-1">
          <p
            v-for="(msg, i) in authStore.error"
            :key="i"
            class="px-4 py-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg"
          >
            {{ msg }}
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="text-sm font-medium block">Nome Completo</label>
            <input
              v-model="name"
              type="text"
              required
              placeholder="Digite seu nome completo"
              class="w-full mt-1 px-3 py-4 border text-xs border-black rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label class="text-sm font-medium block">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="Digite seu email"
              class="w-full mt-1 px-3 py-4 text-xs border border-black rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label class="text-sm font-medium block">Senha</label>
            <input
              v-model="password"
              type="password"
              required
              minlength="6"
              placeholder="Mínimo 6 caracteres"
              class="w-full mt-1 px-3 py-4 border text-xs border-black rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label class="text-sm font-medium block">Confirmar Senha</label>
            <input
              v-model="passwordConfirmation"
              type="password"
              required
              placeholder="Repita sua senha"
              class="w-full mt-1 px-3 py-4 border text-xs border-black rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>

          <p v-if="passwordMismatch" class="text-red-600 text-xs -mt-4">As senhas não coincidem.</p>

          <button
            type="submit"
            :disabled="authStore.loading || passwordMismatch"
            class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading" class="flex items-center gap-2">
              <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Criando conta...
            </span>
            <span v-else>Cadastrar</span>
          </button>

          <div class="text-base text-center pt-2">
            Já possui uma conta?
            <a href="#" @click.prevent="$emit('open-login')" class="font-bold hover:underline text-black">
              Entre agora.
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { X } from 'lucide-vue-next';
import logo from '../../../assets/logo.png';
import { useAuthStore } from '../../../stores/useAuthStore';

const emit = defineEmits(['close', 'open-login']);

const authStore = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const passwordMismatch = computed(
  () => passwordConfirmation.value.length > 0 && password.value !== passwordConfirmation.value
);

const handleRegister = async () => {
  if (passwordMismatch.value) return;
  try {
    await authStore.signup(name.value, email.value, password.value, passwordConfirmation.value);
    emit('open-login');
  } catch {
  }
};
</script>