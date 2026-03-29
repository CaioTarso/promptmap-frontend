<script setup>
import { ref } from 'vue';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import PromptCopyBox from '../../components/posts/PromptCopyBox.vue';
import PostsRecommend from '../../components/posts/PostsRecommend.vue';
import CommentSection from '../../components/comments/CommentSection.vue';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';

// Dados mockados
const post = ref({
  title: 'Criar sass lovable',
  description: 'Prompt ideal para quem quer criar uma sass na loavble mas não sabe por onde começar',
  promptText: 'Lorem ipsum dolor sit amet. Qui nihil consequatur sed beatae dolor non obcaecati enim. Non corporis Quis in sint praesentium et consequatur quibusdam ut vero omnis sit vero magni vel mollitia sint.',
  author: 'Caio Tarso',
  date: '26/10/25',
  isBookmarked: false
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />
    
    <div class="max-w-6xl mx-auto py-12 px-6">
      <div class="flex items-start justify-between mb-8">
        <div class="flex flex-col gap-3">

          <h1 class="text-1xl font-bold text-black text-3xl tracking-tight">{{ post.title }}</h1>
          
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-gray-200"></div>
            <span class="text-xs text-gray-500">
              {{ post.author }} - {{ post.date }}
            </span>
          </div>
        </div>


        <button class="text-black hover:text-gray-600 transition-colors pt-1">
          <Bookmark class="w-6 h-6" :fill="post.isBookmarked ? 'currentColor' : 'none'" />
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        
        <div class="flex flex-col">
          <div class="relative w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-between px-4">
            <button class="p-1 hover:bg-gray-300 rounded-full transition-colors"><ChevronLeft class="w-6 h-6 text-black" /></button>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-white opacity-50"><path d="m21 16-5.16-5.16a2 2 0 0 0-2.83 0l-5.18 5.18"/><path d="m16.24 14.41-4.24-4.24a2 2 0 0 0-2.83 0L3 16"/><path d="M21 21H3"/><path d="M16 21v-5"/><path d="M3 21v-5"/></svg>
            </div>
            <button class="p-1 hover:bg-gray-300 rounded-full transition-colors"><ChevronRight class="w-6 h-6 text-black" /></button>
          </div>
        </div>

        <div class="flex flex-col h-full">
          <h2 class="text-base font-medium text-black mb-3">Prompt :</h2>
          
          <div class="flex-1 min-h-0 relative">
            <PromptCopyBox :promptContent="post.promptText" class="absolute inset-0" />
          </div>
        </div>
      </div>

      <div class="mt-8 mb-16">
        <p class="text-black text-sm leading-relaxed">
          <span class="font-medium">Descrição:</span> <span class="font-normal">{{ post.description }}</span>
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        <div class="flex flex-col">
          <CommentSection />
        </div>

        <div class="flex flex-col">
          <PostsRecommend />
        </div>

      </div>

    </div>
  </div>
</template>