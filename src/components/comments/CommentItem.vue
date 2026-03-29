<script setup>
import { ref } from 'vue';
import { Heart, MessageCircle } from 'lucide-vue-next';

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['like', 'addReply']);

const showReplyInput = ref(false);
const replyText = ref('');

const toggleReplyInput = () => {
  showReplyInput.value = !showReplyInput.value;
  replyText.value = '';
};

const submitReply = () => {
  if (!replyText.value.trim()) return;
  emit('addReply', props.comment.id, replyText.value.trim());
  replyText.value = '';
  showReplyInput.value = false;
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-3 py-4" :class="depth > 0 ? 'pl-8' : ''">
      <div class="w-6 h-6 rounded-full bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
        <img 
          v-if="comment.authorAvatar" 
          :src="comment.authorAvatar" 
          alt="Avatar" 
          class="w-full h-full object-cover"
        />
        <span v-else class="text-xs font-normal text-gray-500">
          {{ comment.authorName.charAt(0).toUpperCase() }}
        </span>
      </div>

      <div class="flex flex-col gap-1.5 flex-1">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-black">{{ comment.authorName }}</span>
          <span class="text-xs text-gray-400">{{ comment.date }}</span>
        </div>

        <p class="text-sm text-black leading-relaxed">{{ comment.content }}</p>

        <div class="flex items-center gap-4 mt-1">
          <button 
            @click="emit('like', comment.id)"
            class="flex items-center gap-1.5 text-sm transition-colors"
            :class="comment.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'"
          >
            <Heart class="w-3.5 h-3.5" :fill="comment.isLiked ? 'currentColor' : 'none'" />
            {{ comment.likes }}
          </button>

          <button 
            v-if="depth < 2"
            @click="toggleReplyInput"
            class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-black transition-colors font-medium"
          >
            <MessageCircle class="w-3.5 h-3.5" />
            Responder
          </button>
        </div>

        <div v-if="showReplyInput" class="flex gap-2 mt-2">
          <input
            v-model="replyText"
            type="text"
            :placeholder="`responder ${comment.authorName}...`"
            class="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray outline-none focus:border-gray-400 transition-colors placeholder:text-black"
            @keydown.enter="submitReply"
          />
          <button
            @click="submitReply"
            class="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shrink-0"
          >
            enviar
          </button>
        </div>
      </div>
    </div>

    <div v-if="comment.replies && comment.replies.length">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :depth="depth + 1"
        @like="(id) => emit('like', id)"
        @addReply="(id, text) => emit('addReply', id, text)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem'
}
</script>