<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const getLinkClass = (path) => {
  return route.path === path
    ? 'bg-black text-white font-semibold'
    : 'text-gray-600 font-medium hover:bg-gray-100';
};
</script>

<template>
  <aside class="flex flex-row md:flex-col gap-1 md:gap-2 w-full md:w-36 md:shrink-0 border-b md:border-b-0 pb-2 md:pb-0 mb-2 md:mb-0">
    <router-link
      to="/profile/edit"
      class="flex-1 md:flex-none text-center md:text-left px-4 py-2 rounded-lg text-sm transition-colors"
      :class="getLinkClass('/profile/edit')"
    >
      Perfil
    </router-link>
    <router-link
      to="/account/edit"
      class="flex-1 md:flex-none text-center md:text-left px-4 py-2 rounded-lg text-sm transition-colors"
      :class="getLinkClass('/account/edit')"
    >
      Conta
    </router-link>
  </aside>
</template>