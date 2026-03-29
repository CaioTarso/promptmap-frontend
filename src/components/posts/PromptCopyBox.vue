<script setup>
import { ref } from 'vue';
import { Copy, Check } from 'lucide-vue-next';

const props = defineProps({
  promptContent: {
    type: String,
    required: true
  }
});

const isCopied = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.promptContent);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Falha ao copiar:', err);
  }
};
</script>

<template>
  <div class="bg-white rounded-lg p-6 relative border border-gray-200 flex flex-col h-full w-full">
    
   
    <button 
      @click="copyToClipboard"
      class="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors p-1"
      title="Copiar prompt"
    >
      <Check v-if="isCopied" class="w-5 h-5 text-green-600" />
      <Copy v-else class="w-5 h-5" />
    </button>

   
    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar mt-2">
      <p class="text-black leading-relaxed text-sm font-medium">
        {{ promptContent }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 4px;
}
</style>
