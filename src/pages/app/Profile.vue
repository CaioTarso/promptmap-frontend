<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import PostCard from '../../components/posts/PostCard.vue';
import { useAuthStore } from '../../stores/useAuthStore';
import userService from '../../services/userService';
import promptService from '../../services/promptService';
import { resolveImageUrl } from '../../lib/imageUrl';

const router = useRouter();
const authStore = useAuthStore();

const myPosts = ref([]);
const loadingPosts = ref(false);
const errorPosts = ref(null);


onMounted(async () => {
  await authStore.fetchMe();

  loadingPosts.value = true;
  try {
    const data = await userService.myPrompts();
    myPosts.value = (data.data || data.prompts || data || []).map(p => ({
      ...p,
      isBookmarked: p.favorited_by_current_user ?? p.is_favorited ?? false,
    }));
  } catch (err) {
    errorPosts.value = 'Não foi possível carregar seus prompts.';
  } finally {
    loadingPosts.value = false;
  }
});

const handlePostClick = (id) => {
  router.push(`/post/${id}`);
};

const handleEditClick = (id) => {
  router.push(`/post/${id}/edit`);
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

    <main class="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">

      <div class="flex flex-col gap-3 mb-10 md:mb-12">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
            <img
              v-if="authStore.currentUser?.avatar"
              :src="authStore.currentUser.avatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-sm font-medium text-gray-500">
              {{ authStore.currentUser?.name?.charAt(0)?.toUpperCase() || '?' }}
            </span>
          </div>

          <span class="text-sm font-medium text-black">{{ authStore.currentUser?.name }}</span>

          <router-link
            to="/profile/edit"
            class="bg-black text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            Editar perfil
          </router-link>
        </div>

        <div class="pt-2 flex flex-col gap-1">
          <span class="text-sm text-gray-500">{{ authStore.currentUser?.email }}</span>
        </div>
      </div>

      <h2 class="text-xl font-bold text-stone-900 mb-6">Meus prompts</h2>

      <div v-if="loadingPosts" class="flex justify-center py-12">
        <svg class="animate-spin w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>

      <p v-else-if="errorPosts" class="text-sm text-red-500">{{ errorPosts }}</p>

      <p v-else-if="myPosts.length === 0" class="text-sm text-gray-400">
        Você ainda não publicou nenhum prompt.
      </p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6 max-w-4xl">
        <PostCard
          v-for="post in myPosts"
          :key="post.id"
          :title="post.title"
          :authorName="post.user?.name || authStore.currentUser?.name"
          :date="post.created_at"
          :thumbnailUrl="resolveImageUrl(post.thumbnail_url || post.thumbnailUrl) || ''"
          :isBookmarked="post.isBookmarked"
          :showEditButton="true"
          @click="handlePostClick(post.id)"
          @edit="handleEditClick(post.id)"
          @toggleBookmark="toggleBookmark(post)"
          class="max-w-none"
        />
      </div>

    </main>
  </div>
</template>
