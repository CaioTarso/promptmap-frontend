<script setup>
import { ref } from 'vue';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import AsideProfile from '../../components/profile/AsideProfile.vue';

const user = ref({
  password: ''
});

const saveProfile = () => {
  console.log('Senha atualizada');
};
</script>

<template>
    <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <div class="max-w-6xl mx-auto px-6 py-12 flex gap-12">

      <AsideProfile />

      <main class="flex-1 max-w-lg">
        <h1 class="text-xl font-semibold text-black mb-8">Configuração de conta</h1>

        <form @submit.prevent="saveProfile" class="flex flex-col gap-6">

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Redefinir senha</label>
            <input
              v-model="user.password"
              type="password"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Senha atual</label>
            <input
              v-model="user.password"
              type="password"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <div>
            <button
              type="submit"
              class="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Salvar
            </button>

          </div>

        </form>
      </main>

    </div>
  </div>
</template>