<script setup>
import { ref, watch } from 'vue'
import { Search, Bookmark, TrendingUp, ChevronDown, ChevronUp, Plus, X } from 'lucide-vue-next'
import logo from '../../assets/logo.png'
import ConfigModal from '../modals/config/ConfigModal.vue'
import { useAuthStore } from '../../stores/useAuthStore'
import { useFilterStore } from '../../stores/useFilterStore'

const authStore = useAuthStore()
const filterStore = useFilterStore()

const showConfig = ref(false)
const localSearch = ref(filterStore.search)
const mobileSearchOpen = ref(false)

let debounceTimer = null
watch(localSearch, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => filterStore.setSearch(val), 400)
})

const navItems = [
  { id: 'bombando',        label: 'Bombando',       icon: TrendingUp, sort: 'popular', promptType: '',         favoritesOnly: false },
  { id: 'favoritos',       label: 'Favoritos',      icon: Bookmark,   sort: 'popular', promptType: '',         favoritesOnly: true  },
  { id: 'imagens',         label: 'Imagens',        icon: null,       sort: 'popular', promptType: 'image',    favoritesOnly: false },
  { id: 'videos',          label: 'Vídeos',         icon: null,       sort: 'popular', promptType: 'video',    favoritesOnly: false },
  { id: 'desenvolvimento', label: 'Desenvolvimento',icon: null,       sort: 'popular', promptType: 'code',     favoritesOnly: false },
  { id: 'documentos',      label: 'Documentos',     icon: null,       sort: 'popular', promptType: 'document', favoritesOnly: false },
]

const activeNav = ref('bombando')

function selectNav(item) {
  activeNav.value = item.id
  filterStore.applyNav(item)
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 select-none sticky top-0 z-50 pt-2">

    <div class="max-w-6xl mx-auto flex items-center justify-between gap-3 md:gap-10 px-4 md:px-6 py-3 md:py-4">

      <div class="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
        <router-link to="/home" class="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
          <img :src="logo" class="w-8 h-9" />
          <span class="hidden sm:inline font-bold text-xl tracking-tight text-black">PromptMAP</span>
        </router-link>

        <div
          class="hidden md:flex flex-1 max-w-2xl items-center bg-[#f3f4f6] px-4 py-2.5 rounded-xl"
        >
          <Search class="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            v-model="localSearch"
            type="text"
            placeholder="Busque prompts"
            class="bg-transparent outline-none w-full text-sm text-gray-600 font-normal placeholder:text-gray-400"
          />
          <button
            v-if="localSearch"
            @click="localSearch = ''"
            class="ml-2 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
            aria-label="Limpar busca"
          >
            ×
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2 md:gap-6 shrink-0">

        <button
          class="md:hidden text-gray-500 hover:text-black transition-colors"
          @click="mobileSearchOpen = !mobileSearchOpen"
          :aria-label="mobileSearchOpen ? 'Fechar busca' : 'Abrir busca'"
        >
          <X v-if="mobileSearchOpen" class="w-5 h-5" />
          <Search v-else class="w-5 h-5" />
        </button>

        <router-link
          to="/create"
          class="flex items-center gap-1.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors px-3 py-2 md:px-6 md:py-2.5"
        >
          <Plus class="w-4 h-4 md:hidden" />
          <span class="hidden md:inline">Publicar</span>
        </router-link>

        <div class="hidden md:block h-6 w-[1px] bg-gray-200"></div>

        <router-link to="/profile" class="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-gray-400 transition-all">
          <img
            v-if="authStore.currentUser?.avatar"
            :src="authStore.currentUser.avatar"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-sm font-medium text-gray-500">
            {{ authStore.currentUser?.name?.charAt(0)?.toUpperCase() || '?' }}
          </span>
        </router-link>

        <div class="relative">
          <ChevronUp v-if="showConfig" class="w-7 h-7 cursor-pointer" @click="showConfig = false" />
          <ChevronDown v-else class="w-7 h-7 cursor-pointer" @click="showConfig = true" />
          <ConfigModal v-if="showConfig" v-model="showConfig" />
        </div>
      </div>
    </div>

    <Transition name="slide-down">
      <div
        v-if="mobileSearchOpen"
        class="md:hidden px-4 pb-3"
      >
        <div class="flex items-center bg-[#f3f4f6] px-4 py-2.5 rounded-xl">
          <Search class="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            v-model="localSearch"
            type="text"
            placeholder="Busque prompts"
            autofocus
            class="bg-transparent outline-none w-full text-sm text-gray-600 font-normal placeholder:text-gray-400"
          />
          <button
            v-if="localSearch"
            @click="localSearch = ''"
            class="ml-2 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
            aria-label="Limpar busca"
          >
            ×
          </button>
        </div>
      </div>
    </Transition>

    <nav class="max-w-6xl mx-auto px-4 md:px-6">
      <div class="flex items-center gap-5 md:gap-8 overflow-x-auto scrollbar-hide">
        <button
          v-for="(item, index) in navItems"
          :key="item.id"
          @click="selectNav(item)"
          class="flex items-center gap-2 py-3 text-sm relative transition-colors whitespace-nowrap shrink-0"
          :class="activeNav === item.id
            ? 'text-black font-semibold'
            : 'text-gray-600 font-semibold hover:text-black'"
        >
          <span
            v-if="activeNav === item.id"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full"
          />

          <component v-if="item.icon" :is="item.icon" class="w-4 h-4" />
          {{ item.label }}

          <div v-if="index === 1" class="hidden md:block h-4 w-[1px] bg-gray-300 ml-6 absolute right-[-1.5rem] top-1/2 -translate-y-1/2"></div>
        </button>
      </div>
    </nav>

  </header>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>