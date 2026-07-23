<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import PostCard from '../../components/posts/PostCard.vue';
import promptService from '../../services/promptService';
import { resolveImageUrl } from '../../lib/imageUrl';

const router = useRouter();

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await promptService.getAll();
    posts.value = (data.data || data.prompts || data || []).map(normalizePost);
  } catch {
    error.value = 'Não foi possível carregar os prompts.';
  } finally {
    loading.value = false;
  }
});

const normalizePost = (p) => ({
  ...p,
  thumbnailUrl: resolveImageUrl(p.thumbnail_url || p.thumbnailUrl) || '',
  authorName: p.user?.name || p.author_name || '',
  isBookmarked: p.favorited_by_current_user ?? p.is_favorited ?? false,
});

const handlePostClick = (id) => {
  router.push(`/post/${id}`);
};

const toggleBookmark = async (post) => {
  const was = post.isBookmarked;
  post.isBookmarked = !was; // otimista
  try {
    if (was) {
      await promptService.unfavorite(post.id);
    } else {
      await promptService.favorite(post.id);
    }
  } catch {
    post.isBookmarked = was; // reverte
  }
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <main class="max-w-6xl mx-auto px-6 py-8">

      <div v-if="loading" class="flex justify-center items-center py-24">
        <svg class="animate-spin w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>

      <p v-else-if="error" class="text-sm text-gray-400 text-center py-16">{{ error }}</p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :authorName="post.authorName"
          :date="post.created_at || post.date || ''"
          :thumbnailUrl="post.thumbnailUrl"
          :isBookmarked="post.isBookmarked"
          @click="handlePostClick(post.id)"
          @toggleBookmark="toggleBookmark(post)"
        />
      </div>

      <p v-if="!loading && !error && !posts.length" class="text-sm text-gray-400 text-center py-16">
        Nenhum prompt encontrado.
      </p>

    </main>
  </div>
</template>
