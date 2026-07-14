<script setup>
import { Settings, MoonStar, LogOut } from 'lucide-vue-next';
import { useAuthStore } from '../../../stores/useAuthStore';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const authStore = useAuthStore()
const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}

async function handleLogout() {
  close()
  await authStore.logout()
}
</script>

<template>
  <div v-if="modelValue" class="absolute right-0 mt-10 w-63 h-42 bg-white shadow-[0px_3px_19px_-6px_rgba(0,_0,_0,_0.4)] rounded-xl">
    <div class="p-4 flex justify-between">
      <span class="font-normal">{{ authStore.currentUser?.name || 'Usuário' }}</span>
      <router-link to="/profile" @click="close">
        <Settings class="w-5 h-5" />
      </router-link>
    </div>

    <div class="h-px bg-gray-200 mx-2"></div>

    <button class="flex items-center w-full text-left px-4 py-2 font-bold">
      <MoonStar class="w-5 h-5 mr-3" /> DarkMode
    </button>
    <button
      @click="handleLogout"
      class="flex items-center w-full text-left px-4 py-2 font-bold hover:bg-gray-50 transition-colors"
    >
      <LogOut class="w-5 h-5 mr-3" /> Sair
    </button>
  </div>
</template>