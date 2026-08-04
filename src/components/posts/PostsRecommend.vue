<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import PostCard from './PostCard.vue';
import promptService from '../../services/promptService';
import { resolveImageUrl } from '../../lib/imageUrl';

const props = defineProps({
  prompt: {
    type: Object,
    default: null,
  },
});

const router = useRouter();
const recommended = ref([]);
const loading = ref(false);

async function fetchRecommended() {
  if (!props.prompt?.id) return;

  loading.value = true;
  try {
    const data = await promptService.getRecommended(props.prompt.id, {
      promptType: props.prompt.prompt_type,
      tags: props.prompt.tags || [],
    });

    const all = data.data || data.prompts || data || [];

    recommended.value = all
      .filter((p) => p.id !== props.prompt.id)
      .slice(0, 4)
      .map((p) => ({
        ...p,
        thumbnailUrl: resolveImageUrl(p.thumbnail_url || p.thumbnailUrl) || '',
        authorName: p.user?.name || p.author_name || '',
        isBookmarked: p.favorited_by_current_user ?? p.is_favorited ?? false,
      }));
  } catch {
    recommended.value = [];
  } finally {
    loading.value = false;
  }
}

watch(() => props.prompt?.id, fetchRecommended, { immediate: true });

const handleCardClick = (id) => {
  router.push(`/post/${id}`).then(() => window.scrollTo(0, 0));
};

const toggleBookmark = (post) => {
  post.isBookmarked = !post.isBookmarked;
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-base text-stone-900 font-semibold mb-2">Recomendados</h3>

    <div v-if="loading" class="flex justify-center py-6">
      <svg class="animate-spin w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>

    <p v-else-if="!recommended.length" class="text-sm text-gray-400">
      Nenhuma recomendação encontrada.
    </p>

    <div v-else class="flex flex-col gap-4">
      <PostCard
        v-for="post in recommended"
        :key="post.id"
        :title="post.title"
        :authorName="post.authorName"
        :date="post.created_at || post.date || ''"
        :thumbnailUrl="post.thumbnailUrl"
        :isBookmarked="post.isBookmarked"
        @click="handleCardClick(post.id)"
        @toggleBookmark="toggleBookmark(post)"
        class="w-full"
      />
    </div>
  </div>
</template>