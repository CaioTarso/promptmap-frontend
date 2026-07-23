<script setup>
import { computed } from 'vue';
import { Bookmark, Pencil, Trash2 } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  authorAvatar: {
    type: String,
    default: ''
  },
  isBookmarked: {
    type: Boolean,
    default: false
  },
  showEditButton: {
    type: Boolean,
    default: false
  },
  showDeleteButton: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click', 'toggleBookmark', 'edit', 'delete']);

const formattedDate = computed(() => {
  if (!props.date) return '';
  const d = new Date(props.date);
  if (isNaN(d.getTime())) return props.date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
});
</script>

<template>
  <div
    class="flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow w-full max-w-[340px]"
  >
    <div
      class="relative w-full aspect-[4/3] rounded-t-xl overflow-hidden bg-gray-200 shrink-0 cursor-pointer"
      @click="emit('click')"
    >
      <img
        v-if="thumbnailUrl"
        :src="thumbnailUrl"
        :alt="title"
        class="h-full w-full object-cover"
      />

      <button
        v-if="showEditButton"
        @click.stop="emit('edit')"
        class="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-black hover:bg-white transition-colors shadow-sm"
        aria-label="Editar prompt"
      >
        <Pencil class="w-3 h-3" />
        Editar
      </button>

      <button
        v-if="showDeleteButton"
        @click.stop="emit('delete')"
        class="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors shadow-sm"
        aria-label="Excluir prompt"
      >
        <Trash2 class="w-3 h-3" />
        Excluir
      </button>
    </div>

    <div class="flex flex-col flex-1 px-3 pb-3">
      <div class="mb-3 cursor-pointer" @click="emit('click')">
        <h3 class="font-semibold text-gray-900 text-1xl leading-snug line-clamp-2">
          {{ title }}
        </h3>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <div class="flex items-center gap-1.5 cursor-pointer" @click="emit('click')">
          <div class="h-5 w-5 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
            <img
              v-if="authorAvatar"
              :src="authorAvatar"
              alt="Avatar"
              class="h-full w-full object-cover"
            />
            <span v-else class="text-[9px] font-semibold text-gray-600">
              {{ authorName ? authorName.charAt(0).toUpperCase() : 'U' }}
            </span>
          </div>

          <span class="text-[12px] text-gray-500 font-semibold truncate leading-none">
            {{ authorName }} · {{ formattedDate }}
          </span>
        </div>

        <button
          class="shrink-0 p-1 hover:bg-gray-100 rounded-md transition-colors"
          :class="isBookmarked ? 'text-black' : 'text-gray-400 hover:text-black'"
          @click.stop="emit('toggleBookmark')"
          aria-label="Favoritar prompt"
        >
          <Bookmark
            class="h-4 w-4"
            :fill="isBookmarked ? 'currentColor' : 'none'"
          />
        </button>
      </div>
    </div>
  </div>
</template>