<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Upload, ChevronDown } from 'lucide-vue-next';
import HeaderGlobal from '../../components/layout/HeaderGlobal.vue';

const router = useRouter();
const route = useRoute();

const isEditMode = computed(() => !!route.params.id);
const pageTitle = computed(() => isEditMode.value ? 'Editar publicação' : 'Publique seu prompt');
const submitLabel = computed(() => isEditMode.value ? 'salvar' : 'publicar');

const title = ref('');
const category = ref('');
const description = ref('');
const promptText = ref('');
const images = ref([]);
const isDragging = ref(false);
const categoryOpen = ref(false);

const categories = [
  'Imagens',
  'Vídeos',
  'Desenvolvimento',
  'Documentos',
];

onMounted(() => {
  if (isEditMode.value) {
    const mockPost = {
      title: 'Criar sass lovable',
      description: 'Prompt ideal para quem quer criar uma sass na lovable',
      category: 'Desenvolvimento',
      promptText: 'Lorem ipsum dolor sit amet. Qui nihil consequatur sed beatae dolor non obcaecati enim.',
    };
    title.value = mockPost.title;
    description.value = mockPost.description;
    category.value = mockPost.category;
    promptText.value = mockPost.promptText;
  }
});

const selectCategory = (cat) => {
  category.value = cat;
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
    reader.onload = (e) => {
      images.value.push({
        file,
        preview: e.target.result,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const handlePublish = () => {
  const action = isEditMode.value ? 'Salvando' : 'Publicando';
  console.log(`${action}:`, {
    id: route.params.id || null,
    title: title.value,
    category: category.value,
    description: description.value,
    promptText: promptText.value,
    images: images.value.map(i => i.name)
  });
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <HeaderGlobal />

    <main class="max-w-2xl mx-auto px-6 py-12">
      
      <h1 class="text-xl font-bold text-black mb-10">{{ pageTitle }}</h1>

      <form @submit.prevent="handlePublish" class="flex flex-col gap-8">

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-black">Título</label>
          <input
            v-model="title"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors"
            placeholder=""
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-black">Descrição</label>
          <input
            v-model="description"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors"
            placeholder=""
          />
        </div>

        <div class="flex flex-col gap-2 relative">
          <label class="text-sm font-semibold text-black">Categoria</label>
          <button
            type="button"
            @click="categoryOpen = !categoryOpen"
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-left flex items-center justify-between outline-none focus:border-gray-400 transition-colors"
            :class="category ? 'text-black' : 'text-gray-400'"
          >
            {{ category || 'Selecione a categoria' }}
            <ChevronDown class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': categoryOpen }" />
          </button>

          <div 
            v-if="categoryOpen"
            class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
          >
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              @click="selectCategory(cat)"
              class="w-full px-4 py-2.5 text-sm text-left hover:bg-[#f3f4f6] transition-colors"
              :class="category === cat ? 'text-black font-semibold bg-[#f3f4f6]' : 'text-gray-600'"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-black">Prompt</label>
          <textarea
            v-model="promptText"
            rows="4"
            class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black outline-none focus:border-gray-400 transition-colors resize-none"
            placeholder=""
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-black">Imagem</label>
          
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

        <div>
          <button
            type="submit"
            class="bg-black text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            {{ submitLabel }}
          </button>
        </div>

      </form>
    </main>
  </div>
</template>
