import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFilterStore = defineStore('filter', () => {
  const search = ref('');
  const sort = ref('popular');
  const promptType = ref('');  
  const favoritesOnly = ref(false);

  function setSearch(value) {
    search.value = value;
  }

  function applyNav({ sort: s, promptType: pt, favoritesOnly: fav }) {
    sort.value = s;
    promptType.value = pt;
    favoritesOnly.value = fav;
  }

  function reset() {
    search.value = '';
    sort.value = 'popular';
    promptType.value = '';
    favoritesOnly.value = false;
  }

  const params = computed(() => {
    const p = {};
    if (search.value)     p.search      = search.value;
    if (sort.value)       p.sort        = sort.value;
    if (promptType.value) p.prompt_type = promptType.value;
    return p;
  });

  return { search, sort, promptType, favoritesOnly, params, setSearch, applyNav, reset };
});
