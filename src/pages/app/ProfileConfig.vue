<script setup>
import { ref, onMounted } from 'vue';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import AsideProfile from '../../components/profile/AsideProfile.vue';
import { useAuthStore } from '../../stores/useAuthStore';
import userService from '../../services/userService';
import { handleApiErrors } from '../../lib/apiErrorHandler';

const authStore = useAuthStore();

const name = ref('');
const saving = ref(false);
const saveError = ref([]);
const saveSuccess = ref(false);

onMounted(async () => {
  await authStore.fetchMe();
  name.value = authStore.currentUser?.name || '';
});

const saveProfile = async () => {
  saving.value = true;
  saveError.value = [];
  saveSuccess.value = false;
  try {
    const data = await userService.updateProfile({ name: name.value });
    authStore.updateUserLocally({ name: name.value, ...(data.data || data.user || {}) });
    saveSuccess.value = true;
  } catch (err) {
    saveError.value = handleApiErrors(err);
  } finally {
    saving.value = false;
  }
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
              v-if="authStore.currentUser?.avatar"
              :src="authStore.currentUser.avatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-base font-medium text-gray-500">
              {{ authStore.currentUser?.name?.charAt(0)?.toUpperCase() || '?' }}
            </span>
          </div>
        </div>

        <div v-if="saveSuccess" class="mb-4 px-4 py-2 bg-green-100 border border-green-300 text-green-700 text-sm rounded-lg">
          Perfil salvo com sucesso!
        </div>
        <div v-if="saveError.length" class="mb-4 space-y-1">
          <p
            v-for="(msg, i) in saveError"
            :key="i"
            class="px-4 py-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg"
          >
            {{ msg }}
          </p>
        </div>

        <form @submit.prevent="saveProfile" class="flex flex-col gap-6">

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input
              :value="authStore.currentUser?.email"
              type="email"
              disabled
              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 bg-gray-50 outline-none cursor-not-allowed"
            />
            <p class="text-xs text-gray-400">O email não pode ser alterado por aqui.</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Nome</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-black outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <button
              type="submit"
              :disabled="saving"
              class="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {{ saving ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>

        </form>
      </main>

    </div>
  </div>
</template>