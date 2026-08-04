<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import PostCard from '../../components/posts/PostCard.vue';
import promptService from '../../services/promptService';
import userService from '../../services/userService';
import { resolveImageUrl } from '../../lib/imageUrl';
import { useFilterStore } from '../../stores/useFilterStore';

const router = useRouter();
const filterStore = useFilterStore();

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchPosts() {
  loading.value = true;
  error.value = null;
  try {
    let data;
    if (filterStore.favoritesOnly) {
      data = await userService.myFavorites();
    } else {
      data = await promptService.getAll(filterStore.params);
    }
    posts.value = (data.data || data.prompts || data || []).map(normalizePost);
  } catch {
    error.value = 'Não foi possível carregar os prompts.';
  } finally {
    loading.value = false;
  }
}

const normalizePost = (p) => ({
  ...p,
  thumbnailUrl: resolveImageUrl(p.thumbnail_url || p.thumbnailUrl) || '',
  authorName: p.user?.name || p.author_name || '',
  isBookmarked: filterStore.favoritesOnly
    ? true
    : (p.favorited_by_current_user ?? p.is_favorited ?? false),
});

watch(
  () => [filterStore.params, filterStore.favoritesOnly],
  () => fetchPosts(),
  { immediate: true, deep: true }
);

const handlePostClick = (id) => {
  router.push(`/post/${id}`);
};

const toggleBookmark = async (post) => {
  const was = post.isBookmarked;
  post.isBookmarked = !was;
  try {
    if (was) {
      await promptService.unfavorite(post.id);
    } else {
      await promptService.favorite(post.id);
    }
  } catch {
    post.isBookmarked = was;
  }
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <main class="max-w-6xl mx-auto px-6 py-8">

      <div v-if="filterStore.search" class="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <span>Resultados para:</span>
        <span class="font-semibold text-black">"{{ filterStore.search }}"</span>
      </div>

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
