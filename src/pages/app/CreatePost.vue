<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Upload, ChevronDown, X } from 'lucide-vue-next';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';
import promptService from '../../services/promptService';

const router = useRouter();
const route = useRoute();

const isEditMode = computed(() => !!route.params.id);
const pageTitle = computed(() => isEditMode.value ? 'Editar publicação' : 'Publique seu prompt');
const submitLabel = computed(() => isEditMode.value ? 'Salvar' : 'Publicar');

const title = ref('');
const category = ref('');
const description = ref('');
const promptText = ref('');
const images = ref([]);
const isDragging = ref(false);
const categoryOpen = ref(false);
const submitting = ref(false);
const submitError = ref('');
const loadingData = ref(false);

const tags = ref([]);
const tagInput = ref('');

const addTag = () => {
  const val = tagInput.value.trim().toLowerCase().replace(/\s+/g, '-');
  if (val && !tags.value.includes(val) && tags.value.length < 10) {
    tags.value.push(val);
  }
  tagInput.value = '';
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
};

const handleTagKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTag();
  } else if (e.key === 'Backspace' && tagInput.value === '' && tags.value.length) {
    tags.value.pop();
  }
};

const categories = [
  { label: 'Imagens', value: 'image' },
  { label: 'Vídeos', value: 'video' },
  { label: 'Desenvolvimento', value: 'code' },
  { label: 'Documentos', value: 'document' },
];

const categoryLabel = computed(() => {
  const found = categories.find(c => c.value === category.value);
  return found ? found.label : '';
});

onMounted(async () => {
  if (isEditMode.value) {
    loadingData.value = true;
    try {
      const data = await promptService.getById(route.params.id);
      const p = data.data || data;
      title.value = p.title || '';
      description.value = p.description || '';
      promptText.value = p.content || '';
      category.value = p.prompt_type || '';
      if (p.tags && Array.isArray(p.tags)) {
        tags.value = p.tags.map(t => t.name || t);
      }
    } catch (err) {
      submitError.value = 'Não foi possível carregar os dados do prompt.';
    } finally {
      loadingData.value = false;
    }
  }
});

const selectCategory = (cat) => {
  category.value = cat.value;
  categoryOpen.value = false;
};

const handleDragOver = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;
  const files = Array.from(e.dataTransfer.files).filter(f =>
    f.type.startsWith('image/')
  );
  addFiles(files);
};

const handleFileInput = (e) => {
  const files = Array.from(e.target.files);
  addFiles(files);
};

const addFiles = (files) => {
  const maxFiles = 5;
  const remaining = maxFiles - images.value.length;
  const toAdd = files.slice(0, remaining);

  toAdd.forEach(file => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      images.value.push({
        file,
        preview: ev.target.result,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const handlePublish = async () => {
  submitError.value = '';
  submitting.value = true;

  let payload;
  const hasImages = images.value.length > 0;

  if (hasImages) {
    const form = new FormData();
    form.append('prompt[title]', title.value);
    form.append('prompt[description]', description.value);
    form.append('prompt[content]', promptText.value);
    form.append('prompt[prompt_type]', category.value);
    tags.value.forEach(tag => form.append('prompt[tag_names][]', tag));
    images.value.forEach(img => form.append('prompt[images][]', img.file));
    payload = form;
  } else {
    payload = {
      title: title.value,
      description: description.value,
      content: promptText.value,
      prompt_type: category.value,
      tag_names: tags.value,
    };
  }

  try {
    let result;
    if (isEditMode.value) {
      result = await promptService.update(route.params.id, payload, hasImages);
    } else {
      result = await promptService.create(payload, hasImages);
    }

    const savedId = result.data?.id || result.id || route.params.id;
    router.push(`/post/${savedId}`);
  } catch (err) {
    const msgs = err.response?.data?.errors;
    submitError.value = Array.isArray(msgs)
      ? msgs.join(', ')
      : (err.response?.data?.error || 'Ocorreu um erro. Tente novamente.');
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <div v-if="loadingData" class="flex justify-center items-center py-32">
      <svg class="animate-spin w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>

    <main v-else class="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">

      <h1 class="text-xl font-bold text-black mb-10">{{ pageTitle }}</h1>

      <form @submit.prevent="handlePublish" class="flex flex-col gap-8">

        <div class="flex flex-col gap-2">
          <label class="text-base font-semibold text-black">Título</label>
          <input
            v-model="title"
            type="text"
            required
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors"
            placeholder=""
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-base font-semibold text-black">Descrição</label>
          <input
            v-model="description"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors"
            placeholder=""
          />
        </div>

        <div class="flex flex-col gap-2 relative">
          <label class="text-base font-semibold text-black">Categoria</label>
          <button
            type="button"
            @click="categoryOpen = !categoryOpen"
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-left flex items-center justify-between outline-none focus:border-gray-400 transition-colors"
            :class="category ? 'text-black' : 'text-gray-400'"
          >
            {{ categoryLabel || 'Selecione a categoria' }}
            <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': categoryOpen }" />
          </button>

          <div
            v-if="categoryOpen"
            class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
          >
            <button
              v-for="cat in categories"
              :key="cat.value"
              type="button"
              @click="selectCategory(cat)"
              class="w-full px-4 py-2.5 text-sm text-left hover:bg-[#f3f4f6] transition-colors"
              :class="category === cat.value ? 'text-black font-medium bg-[#f3f4f6]' : 'text-gray-600'"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-base font-semibold text-black">Prompt</label>
          <textarea
            v-model="promptText"
            rows="4"
            required
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors resize-none"
            placeholder=""
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-base font-semibold text-black">Tags</label>
          <div
            class="flex flex-wrap gap-2 w-full border border-gray-200 rounded-lg px-3 py-2.5 min-h-[46px] focus-within:border-gray-400 transition-colors cursor-text"
            @click="$refs.tagInputRef.focus()"
          >
            <span
              v-for="(tag, i) in tags"
              :key="i"
              class="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              #{{ tag }}
              <button type="button" @click.stop="removeTag(i)" class="hover:text-red-500 transition-colors">
                <X class="w-3 h-3" />
              </button>
            </span>
            <input
              ref="tagInputRef"
              v-model="tagInput"
              @keydown="handleTagKeydown"
              @blur="addTag"
              type="text"
              class="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-black placeholder:text-gray-400"
              placeholder="Adicione tags e pressione Enter"
            />
          </div>
          <p class="text-xs text-gray-400">Pressione Enter ou vírgula para adicionar · máx. 10 tags</p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-base font-semibold text-black">Imagem</label>

          <div
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
            class="border border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer"
            :class="isDragging ? 'border-black bg-gray-50' : 'bg-white hover:bg-[#fafafa]'"
            @click="$refs.fileInput.click()"
          >
            <Upload class="w-8 h-8 text-gray-400" />
            <p class="text-sm text-gray-600 text-center">
              Escolha os arquivos ou arraste e solte aqui
            </p>
            <span class="text-xs text-gray-400">JPEG, PNG até 50MB · 5 imagens</span>

            <button
              type="button"
              class="mt-2 border border-gray-300 rounded-lg px-5 py-2 text-sm text-black hover:bg-gray-50 transition-colors"
              @click.stop="$refs.fileInput.click()"
            >
              Escolher arquivo
            </button>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/jpeg,image/png"
            multiple
            class="hidden"
            @change="handleFileInput"
          />

          <div v-if="images.length" class="flex gap-3 mt-3 flex-wrap">
            <div
              v-for="(img, index) in images"
              :key="index"
              class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 group"
            >
              <img :src="img.preview" :alt="img.name" class="w-full h-full object-cover" />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span class="text-white text-xs font-bold">✕</span>
              </button>
            </div>
          </div>
        </div>

        <p v-if="submitError" class="text-sm text-red-500">{{ submitError }}</p>

        <div>
          <button
            type="submit"
            :disabled="submitting"
            class="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg v-if="submitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            {{ submitLabel }}
          </button>
        </div>

      </form>
    </main>
  </div>
</template>
