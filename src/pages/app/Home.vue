<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search, Bookmark } from 'lucide-vue-next';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import PostCard from '../../components/posts/PostCard.vue';

const router = useRouter();
const searchQuery = ref('');

const posts = ref([
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
    isBookmarked: true
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
  },
  {
    id: 5,
    title: 'testeeeeeeeeeee',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop',
    isBookmarked: true
  },
  {
    id: 6,
    title: 'aaaaaaaaaaaaaaaaaah',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    isBookmarked: false
  },
  {
    id: 7,
    title: 'Formatar documento',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    isBookmarked: false
  },
  {
    id: 8,
    title: 'testeeeeeeeeeee',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop',
    isBookmarked: true
  },
  {
    id: 9,
    title: 'aaaaaaaaaaaaaaaaaah',
    author: 'Caio Tarso',
    date: '26/10/25',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
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
    
    <main class="max-w-6xl mx-auto px-6 py-8">
      
      <div class="flex items-center gap-4 mb-10">
        <div class="flex items-center bg-[#efefef] px-3 py-1.5 rounded-lg w-48">
          <Search class="w-4 h-4 text-gray-400 mr-2" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Busque" 
            class="bg-transparent outline-none w-full text-sm text-gray-600"
          />
        </div>
        
        <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bookmark class="w-5 h-5 text-black" />
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        <PostCard 
          v-for="post in posts" 
          :key="post.id"
          :title="post.title"
          :authorName="post.author"
          :date="post.date"
          :thumbnailUrl="post.thumbnailUrl"
          :isBookmarked="post.isBookmarked"
          @click="handlePostClick(post.id)"
          @toggleBookmark="toggleBookmark(post)"
        />
      </div>

    </main>
  </div>
</template>
