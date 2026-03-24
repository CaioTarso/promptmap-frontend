<script setup>
import { ref } from 'vue';
import PostCard from './PostCard.vue';

const recommendedPosts = ref([
  {
    id: 1,
    title: 'Design Minimalista UI',
    authorName: 'Caio Tarso',
    date: '25/03/2026',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
    isBookmarked: false
  },
  {
    id: 2,
    title: 'Logo para cafeteria',
    authorName: 'Caio Tarso',
    date: '20/03/2026',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=400&fit=crop',
    isBookmarked: true
  },
  {
    id: 3,
    title: 'Cenário Cyberpunk 8k',
    authorName: 'Caio Tarso',
    date: '15/03/2026',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop',
    isBookmarked: false
  }
]);

import { useRouter } from 'vue-router';
const router = useRouter();

const handleCardClick = (id) => {
  router.push(`/post/${id}`).then(() => {
    window.scrollTo(0, 0);
  });
};

const toggleBookmark = (post) => {
  post.isBookmarked = !post.isBookmarked;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex mb-2">
        <h3 class="text-sm text-stone-900 font-semibold">
            Recomendados
        </h3>
    </div>
    
    <div class="flex flex-col gap-4">
      <PostCard 
        v-for="post in recommendedPosts" 
        :key="post.id"
        :title="post.title"
        :authorName="post.authorName"
        :date="post.date"
        :thumbnailUrl="post.thumbnailUrl"
        :isBookmarked="post.isBookmarked"
        @click="handleCardClick(post.id)"
        @toggleBookmark="toggleBookmark(post)"
        class="w-full" 
      />
    </div>
  </div>
</template>