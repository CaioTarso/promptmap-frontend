<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import AsideProfile from '../../components/profile/AsideProfile.vue';

const router = useRouter();

const user = ref({
  name: 'CaioTarso',
  email: 'caio@teste.com',
  bio: 'Just having fun',
  avatar: ''
});

const saveProfile = () => {
  console.log('Perfil salvo:', user.value);
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <div class="max-w-6xl mx-auto px-6 py-12 flex gap-12">

      <AsideProfile />

      <main class="flex-1 max-w-lg">
        <h1 class="text-xl font-semibold text-black mb-8">Configuração de perfil</h1>

        <div class="mb-8">
          <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-base font-medium text-gray-500">
              {{ user.name.charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <form @submit.prevent="saveProfile" class="flex flex-col gap-6">

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="user.email"
              type="email"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-black transition-colors"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Username</label>
            <input
              v-model="user.name"
              type="text"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-black transition-colors"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              v-model="user.bio"
              rows="3"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-black transition-colors resize-none"
            ></textarea>
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