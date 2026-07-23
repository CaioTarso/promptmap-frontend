<script setup>
import { ref, onMounted } from 'vue';
import CommentItem from './CommentItem.vue';
import commentService from '../../services/commentService';

const props = defineProps({
  promptId: {
    type: [String, Number],
    required: true,
  },
  currentUserId: {
    type: Number,
    default: null,
  },
});

const comments = ref([]);
const newComment = ref('');
const loading = ref(true);
const submitting = ref(false);
const error = ref('');

const findComment = (list, id) => {
  for (const c of list) {
    if (c.id === id) return c;
    if (c.replies?.length) {
      const found = findComment(c.replies, id);
      if (found) return found;
    }
  }
  return null;
};

const removeComment = (list, id) => {
  const idx = list.findIndex(c => c.id === id);
  if (idx !== -1) { list.splice(idx, 1); return true; }
  for (const c of list) {
    if (c.replies?.length && removeComment(c.replies, id)) return true;
  }
  return false;
};

onMounted(async () => {
  try {
    const data = await commentService.getByPrompt(props.promptId);
    comments.value = (data.data || data || []).map(normalizeComment);
  } catch {
    error.value = 'Não foi possível carregar os comentários.';
  } finally {
    loading.value = false;
  }
});

const normalizeComment = (c) => ({
  id: c.id,
  authorName: c.user?.name || c.author_name || 'Anônimo',
  authorAvatar: c.user?.avatar || '',
  authorId: c.user?.id || c.user_id || null,
  date: c.created_at || '',
  content: c.content || '',
  likes: Number(c.comment_likes_count ?? c.likes_count ?? c.likes ?? 0),
  isLiked: c.liked_by_current_user ?? c.is_liked ?? false,
  replies: (c.replies || c.children || []).map(normalizeComment),
});

const addComment = async () => {
  const text = newComment.value.trim();
  if (!text || submitting.value) return;
  submitting.value = true;
  try {
    const data = await commentService.create(props.promptId, text);
    comments.value.push(normalizeComment(data.data || data));
    newComment.value = '';
  } catch {
  } finally {
    submitting.value = false;
  }
};

const toggleLike = async (commentId) => {
  const comment = findComment(comments.value, commentId);
  if (!comment) return;

  const wasLiked = comment.isLiked;
  // Otimista: aplica antes da resposta da API
  comment.isLiked = !wasLiked;
  comment.likes = Math.max(0, Number(comment.likes) + (wasLiked ? -1 : 1));

  try {
    if (wasLiked) {
      await commentService.unlike(commentId);
    } else {
      await commentService.like(commentId);
    }
  } catch {
    comment.isLiked = wasLiked;
    comment.likes = Math.max(0, Number(comment.likes) + (wasLiked ? 1 : -1));
  }
};

const deleteComment = async (commentId) => {
  try {
    await commentService.destroy(commentId);
    removeComment(comments.value, commentId);
  } catch {
  }
};

const addReply = async (parentId, text) => {
  try {
    const data = await commentService.create(props.promptId, text, parentId);
    const parent = findComment(comments.value, parentId);
    if (parent) {
      if (!parent.replies) parent.replies = [];
      parent.replies.push(normalizeComment(data.data || data));
    }
  } catch {
  }
};
</script>

<template>
  <div class="flex flex-col">
    <h2 class="text-base text-stone-900 font-semibold">Comentários</h2>

    <div class="flex flex-col gap-3 mb-6 pt-7">
      <input
        v-model="newComment"
        type="text"
        placeholder="adicione seu comentário"
        class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
        @keydown.enter="addComment"
        :disabled="submitting"
      />
      <div>
        <button
          @click="addComment"
          :disabled="submitting || !newComment.trim()"
          class="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="submitting" class="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          publicar
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-6">
      <svg class="animate-spin w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>

    <p v-else-if="error" class="text-sm text-red-400 py-2">{{ error }}</p>

    <div v-else class="divide-y divide-gray-100">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :depth="0"
        :currentUserId="currentUserId"
        @like="toggleLike"
        @delete="deleteComment"
        @addReply="addReply"
      />
    </div>

    <p v-if="!loading && !error && !comments.length" class="text-sm text-gray-400 py-4">
      Nenhum comentário ainda. Seja o primeiro!
    </p>
  </div>
</template>
