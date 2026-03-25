<script setup>
import { ref } from 'vue'
import { Search, Bookmark, TrendingUp } from 'lucide-vue-next'
import logo from "../../assets/logo.png"

const searchQuery = ref('')
const activeNav = ref('bombando')

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
        <span class="font-light text-xl tracking-tight text-black">PromptMAP</span>
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
        <button class="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">
          publicar
        </button>

        <div class="h-6 w-[1px] bg-gray-200"></div>

        <div class="w-10 h-10 bg-[#e5e7eb] rounded-full border border-gray-100 shadow-sm"></div>
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
            : 'text-gray-600 font-medium hover:text-black'"
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