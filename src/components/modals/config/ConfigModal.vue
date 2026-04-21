<script setup>
import { ref } from 'vue'
import { Settings, MoonStar, LogOut } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const user = ref({
  name: 'Caio teste',
  email: 'caio@teste.com',
  bio: 'Just having fun',
  avatar: ''
});

const emit = defineEmits(['update:modelValue'])

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
    <div v-if="modelValue" class="absolute right-0 mt-10 w-63 h-42 bg-white shadow-[0px_3px_19px_-6px_rgba(0,_0,_0,_0.4)] rounded-xl">
    <div class="p-4 flex justify-between">
       
      <span class="font-semibold">{{ user.name }}</span>
      <router-link to="/profile">
        <Settings class="w-5 h-5" />
      </router-link>
    </div>
    
    <div class="h-px bg-gray-200 mx-2"></div>

    <button class="flex items-center w-full text-left px-4 py-2 font-semibold">
        <MoonStar class="w-5 h-5 mr-3" /> DarkMode
    </button>
    <router-link to="/" class="flex items-center w-full text-left px-4 py-2 font-semibold">
        <LogOut class="w-5 h-5 mr-3" /> Sair
    </router-link>
  </div>
</template>