<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Bookmark, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-vue-next';
import PromptCopyBox from '../../components/posts/PromptCopyBox.vue';
import PostsRecommend from '../../components/posts/PostsRecommend.vue';
import CommentSection from '../../components/comments/CommentSection.vue';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import { useAuthStore } from '../../stores/useAuthStore';
import promptService from '../../services/promptService';
import { resolveImageUrl } from '../../lib/imageUrl';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const post = ref(null);
const loading = ref(true);
const error = ref(null);

const currentImageIndex = ref(0);

const postImages = computed(() => {
  if (!post.value) return [];
  const urls = post.value.image_urls;
  if (Array.isArray(urls) && urls.length > 0) return urls;
  if (post.value.thumbnail_url) return [post.value.thumbnail_url];
  return [];
});

const currentImage = computed(() => postImages.value[currentImageIndex.value] || null);
const hasImages = computed(() => postImages.value.length > 0);

const prevImage = () => {
  if (!hasImages.value) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + postImages.value.length) % postImages.value.length;
};

const nextImage = () => {
  if (!hasImages.value) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % postImages.value.length;
};

const getImageUrl = (img) => {
  const raw = typeof img === 'string' ? img : (img?.url || img?.src || img?.image_url || '');
  return resolveImageUrl(raw) || '';
};

const isOwner = () => {
  if (!post.value || !authStore.currentUser) return false;
  return post.value.user?.id === authStore.currentUser.id;
};

const formattedDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
};

onMounted(async () => {
  await authStore.fetchMe();
  try {
    const data = await promptService.getById(route.params.id);
    post.value = data.data || data;
    currentImageIndex.value = 0;
  } catch (err) {
    error.value = 'Não foi possível carregar o prompt. Verifique se ele existe.';
  } finally {
    loading.value = false;
  }
});

const goToEdit = () => {
  router.push(`/post/${route.params.id}/edit`);
};

const showDeleteModal = ref(false);
const deleting = ref(false);
const deleteError = ref('');

const confirmDelete = async () => {
  deleting.value = true;
  deleteError.value = '';
  try {
    await promptService.destroy(route.params.id);
    router.push('/profile');
  } catch (err) {
    deleteError.value = err.response?.data?.error || 'Não foi possível excluir o prompt.';
    deleting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <div v-if="loading" class="flex justify-center items-center py-32">
      <svg class="animate-spin w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>

    <div v-else-if="error" class="max-w-6xl mx-auto py-24 px-6 flex flex-col items-center gap-4">
      <p class="text-gray-500 text-sm">{{ error }}</p>
      <button
        @click="router.back()"
        class="text-sm text-black underline hover:opacity-70 transition-opacity"
      >
        Voltar
      </button>
    </div>

    <div v-else-if="post" class="max-w-6xl mx-auto py-12 px-6">
      <div class="flex items-start justify-between mb-8">
        <div class="flex flex-col gap-3">
          <h1 class="text-3xl font-bold text-black tracking-tight">{{ post.title }}</h1>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
              <img
                v-if="post.user?.avatar"
                :src="post.user.avatar"
                alt="Avatar"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-[9px] font-semibold text-gray-600">
                {{ post.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
              </span>
            </div>
            <span class="text-sm text-gray-500">
              {{ post.user?.name }} · {{ formattedDate(post.created_at) }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <button
            v-if="isOwner()"
            @click="goToEdit"
            class="flex items-center gap-1.5 border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
          >
            <Pencil class="w-4 h-4" />
            Editar
          </button>

          <button
            v-if="isOwner()"
            @click="showDeleteModal = true"
            class="flex items-center gap-1.5 border border-red-100 rounded-lg px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 class="w-4 h-4" />
            Excluir
          </button>

          <button class="text-black hover:text-gray-600 transition-colors">
            <Bookmark class="w-6 h-6" fill="none" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div class="flex flex-col">
          <div class="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <img
              v-if="hasImages && currentImage"
              :src="getImageUrl(currentImage)"
              :alt="post.title"
              class="w-full h-full object-cover"
            />

            <div v-else class="absolute inset-0 flex items-center justify-center">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-white opacity-50">
                <path d="m21 16-5.16-5.16a2 2 0 0 0-2.83 0l-5.18 5.18"/>
                <path d="m16.24 14.41-4.24-4.24a2 2 0 0 0-2.83 0L3 16"/>
                <path d="M21 21H3"/>
                <path d="M16 21v-5"/>
                <path d="M3 21v-5"/>
              </svg>
            </div>

            <template v-if="postImages.length > 1">
              <button
                @click="prevImage"
                class="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-sm"
              >
                <ChevronLeft class="w-5 h-5 text-white" />
              </button>
              <button
                @click="nextImage"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-sm"
              >
                <ChevronRight class="w-5 h-5 text-white" />
              </button>

              <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                <button
                  v-for="(_, i) in postImages"
                  :key="i"
                  @click="currentImageIndex = i"
                  class="w-1.5 h-1.5 rounded-full transition-all"
                  :class="i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'"
                />
              </div>
            </template>
          </div>
        </div>


        <div class="flex flex-col h-full">
          <h2 class="text-base font-semibold text-black mb-3">Prompt:</h2>
          <div class="flex-1 min-h-0 relative">
            <PromptCopyBox :promptContent="post.content || ''" class="absolute inset-0" />
          </div>
        </div>
      </div>

      <div class="mt-8 mb-16" v-if="post.description">
        <p class="text-black text-base leading-relaxed">
          <span class="font-semibold">Descrição:</span>
          <span class="font-normal"> {{ post.description }}</span>
        </p>
      </div>

      <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-10">
        <span
          v-for="tag in post.tags"
          :key="tag.id || tag.name"
          class="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600"
        >
          #{{ tag.name }}
        </span>
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

  <Transition name="fade">
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        @click="showDeleteModal = false"
      />
      <div class="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <h2 class="text-base font-bold text-black">Excluir prompt</h2>
          <p class="text-sm text-gray-500">
            Tem certeza que deseja excluir <span class="font-semibold text-black">"{{ post?.title }}"</span>? Essa ação não pode ser desfeita.
          </p>
        </div>

        <p v-if="deleteError" class="text-sm text-red-500">{{ deleteError }}</p>

        <div class="flex gap-3 justify-end">
          <button
            @click="showDeleteModal = false"
            :disabled="deleting"
            class="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            :disabled="deleting"
            class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            <svg v-if="deleting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>