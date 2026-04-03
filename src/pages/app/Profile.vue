<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import PostCard from '../../components/posts/PostCard.vue';

const router = useRouter();

const user = ref({
  name: 'CaioTarso',
  email: 'caio@teste.com',
  bio: 'Just having fun',
  avatar: ''
});

const myPosts = ref([
  {
    id: 1,
    title: 'Gerar vídeo de gótica',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
    isBookmarked: false
  },
  {
    id: 2,
    title: 'Criar sass lovable',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=400&fit=crop',
    isBookmarked: false
  },
  {
    id: 3,
    title: 'Gerar imagem na roça',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop',
    isBookmarked: false
  },
  {
    id: 4,
    title: 'Formatar documento',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    isBookmarked: false
  }
]);

const handlePostClick = (id) => {
  router.push(`/post/${id}`);
};

const toggleBookmark = (post) => {
  post.isBookmarked = !post.isBookmarked;
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <main class="max-w-6xl mx-auto px-6 py-12">

      <div class="flex flex-col gap-3 mb-12">
        <div class="flex items-center gap-4">
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

          <span class="text-sm font-medium text-black">{{ user.name }}</span>

          <router-link 
            to="/profile/edit"
            class="bg-black text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            Editar
          </router-link>
        </div>

        <div class="pt-2 flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ user.email }}</span>
          <span class="text-sm text-gray-500">{{ user.bio }}</span>
        </div>
      </div>

      <h2 class="text-xl font-bold text-stone-900 mb-6">Meus prompts</h2>

      <div class="grid grid-cols-2 gap-x-5 gap-y-6 max-w-4xl">
        <PostCard 
          v-for="post in myPosts" 
          :key="post.id"
          :title="post.title"
          :authorName="post.author"
          :date="post.date"
          :thumbnailUrl="post.thumbnailUrl"
          :isBookmarked="post.isBookmarked"
          @click="handlePostClick(post.id)"
          @toggleBookmark="toggleBookmark(post)"
          class="max-w-none"
        />
      </div>

    </main>
  </div>
</template>
