<script setup>
import { Bookmark } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  authorAvatar: {
    type: String,
    default: ''
  },
  isBookmarked: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click', 'toggleBookmark']);
</script>

<template>
  <div 
    class="flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full max-w-[340px]"
    @click="emit('click')"
  >
    <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 shrink-0">
      <img 
        v-if="thumbnailUrl" 
        :src="thumbnailUrl" 
        :alt="title" 
        class="h-full w-full object-cover"
      />
    </div>

    <div class="flex flex-col flex-1">
      <div class="mb-3">
        <h3 class="font-bold text-gray-900 text-xs leading-snug line-clamp-2">
          {{ title }}
        </h3>
      </div>
      
      <div class="flex items-center justify-between mt-auto">
        <div class="flex items-center gap-1.5">
          <div class="h-5 w-5 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
            <img 
              v-if="authorAvatar" 
              :src="authorAvatar" 
              alt="Avatar" 
              class="h-full w-full object-cover"
            />
            <span v-else class="text-[9px] font-medium text-gray-600">
              {{ authorName ? authorName.charAt(0).toUpperCase() : 'U' }}
            </span>
          </div>
          
          <span class="text-[10px] text-gray-600 font-semibold truncate leading-none">
            {{ authorName }} - {{ date }}
          </span>
        </div>

        <button 
          class="shrink-0 p-1 hover:bg-gray-100 rounded-md transition-colors"
          :class="isBookmarked ? 'text-black' : 'text-gray-400 hover:text-black'"
          @click.stop="emit('toggleBookmark')"
          aria-label="Favoritar prompt"
        >
          <Bookmark 
            class="h-4 w-4" 
            :fill="isBookmarked ? 'currentColor' : 'none'" 
          />
        </button>
      </div>
    </div>
  </div>
</template>