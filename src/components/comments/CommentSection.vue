<script setup>
import { ref } from 'vue';
import CommentItem from './CommentItem.vue';

const newComment = ref('');

const comments = ref([
  {
    id: 1,
    authorName: 'John Doe',
    date: '12/11/25',
    content: 'Massa de verdade',
    likes: 0,
    isLiked: false,
    replies: []
  },
  {
    id: 2,
    authorName: 'Caio2',
    date: '12/11/25',
    content: 'uau',
    likes: 2,
    isLiked: false,
    replies: [
      {
        id: 3,
        authorName: 'John Doe',
        date: '13/11/25',
        content: 'Também achei!',
        likes: 1,
        isLiked: false,
        replies: []
      }
    ]
  }
]);

const addComment = () => {
  if (!newComment.value.trim()) return;
  
  comments.value.push({
    id: Date.now(),
    authorName: 'Você',
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }),
    content: newComment.value.trim(),
    likes: 0,
    isLiked: false,
    replies: []
  });
  
  newComment.value = '';
};

const findComment = (list, id) => {
  for (const comment of list) {
    if (comment.id === id) return comment;
    if (comment.replies?.length) {
      const found = findComment(comment.replies, id);
      if (found) return found;
    }
  }
  return null;
};

const toggleLike = (commentId) => {
  const comment = findComment(comments.value, commentId);
  if (comment) {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
};

const addReply = (parentId, text) => {
  const parent = findComment(comments.value, parentId);
  if (parent) {
    if (!parent.replies) parent.replies = [];
    parent.replies.push({
      id: Date.now(),
      authorName: 'Você',
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }),
      content: text,
      likes: 0,
      isLiked: false,
      replies: []
    });
  }
};
</script>

<template>
  <div class="flex flex-col">
    <h2 class="text-sm text-stone-900 font-semibold">Comentários</h2>

    <div class="flex flex-col gap-3 mb-6 pt-7">
      <input
        v-model="newComment"
        type="text"
        placeholder="adicione seu comentário"
        class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
        @keydown.enter="addComment"
      />
      <div>
        <button
          @click="addComment"
          class="bg-black text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors mt-2"
        >
          publicar
        </button>
      </div>
    </div>

    <div class="divide-y divide-gray-100">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :depth="0"
        @like="toggleLike"
        @addReply="addReply"
      />
    </div>

    <p v-if="!comments.length" class="text-sm text-gray-400 py-4">
      Nenhum comentário ainda. Seja o primeiro!
    </p>
  </div>
</template>
