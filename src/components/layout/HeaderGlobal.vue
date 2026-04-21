<script setup>
import { ref } from 'vue'
import { Search, Bookmark, TrendingUp,ChevronDown, ChevronUp } from 'lucide-vue-next'
import logo from "../../assets/logo.png"
import ConfigModal from "../modals/config/ConfigModal.vue"

const searchQuery = ref('')
const activeNav = ref('bombando')
const showConfig = ref(false)

const user = ref({
  name: 'Caio teste',
  email: 'caio@teste.com',
  bio: 'Just having fun',
  avatar: ''
});

const navItems = [
  { id: 'bombando', label: 'Bombando', icon: TrendingUp },
  { id: 'favoritos', label: 'Favoritos', icon: Bookmark },
  { id: 'imagens', label: 'Imagens' },
  { id: 'videos', label: 'Vídeos' },
  { id: 'desenvolvimento', label: 'Desenvolvimento' },
  { id: 'documentos', label: 'Documentos' },
]
</script>

<template>
  <header class="bg-white border-b border-gray-200 select-none sticky top-0 z-50 pt-2">

    <div class="max-w-6xl mx-auto flex items-center justify-between gap-10 px-6 py-4">
      
      <div class="flex items-center gap-8 flex-1">
        <router-link to="/home" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img :src="logo" class="w-8 h-8" />
        <span class="font-bold text-xl tracking-tight text-black">PromptMAP</span>
      </router-link>

        <div class="flex-1 max-w-2xl flex items-center bg-[#f3f4f6] px-4 py-2.5 rounded-xl">
          <Search class="w-4 h-4 text-gray-400 mr-2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Busque prompts"
            class="bg-transparent outline-none w-full text-sm text-gray-600 font-normal placeholder:text-gray-400"
          />
        </div>
      </div>

      <div class="flex items-center gap-6">
        <router-link to="/create" class="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
          Publicar
        </router-link>

        <div class="h-6 w-[1px] bg-gray-200"></div>

        <div class="w-10 h-10 rounded-full bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
            <img 
              v-if="user.avatar" 
              :src="user.avatar" 
              alt="Avatar" 
              class="w-full h-full object-cover"
            />
            <span v-else class="text-sm font-medium text-gray-500">
              {{ user.name.charAt(0).toUpperCase() }}
            </span>
        </div>
        <div class="relative">
          <ChevronUp v-if="showConfig" class="w-7 h-7 cursor-pointer" @click="showConfig = false" />
          <ChevronDown v-else class="w-7 h-7 cursor-pointer" @click="showConfig = true" />
          <ConfigModal v-if="showConfig" v-model="showConfig" />
        </div>
      </div>
    </div>

    <nav class="max-w-6xl mx-auto px-6 flex items-center">
      <div class="flex items-center gap-8">
        <button
          v-for="(item, index) in navItems"
          :key="item.id"
          @click="activeNav = item.id"
          class="flex items-center gap-2 py-3 text-sm relative transition-colors"
          :class="activeNav === item.id 
            ? 'text-black font-semibold' 
            : 'text-gray-600 font-semibold hover:text-black'"
        >
          <component
            v-if="item.icon"
            :is="item.icon"
            class="w-4 h-4"
          />

          {{ item.label }}

          <div v-if="index === 1" class="h-4 w-[1px] bg-gray-300 ml-6 absolute right-[-1.5rem] top-1/2 -translate-y-1/2 "></div>

          
        </button>
      </div>
    </nav>

  </header>
</template>