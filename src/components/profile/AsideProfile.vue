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
  <aside class="flex flex-col gap-2 w-36 shrink-0">
    <router-link
      to="/profile/edit"
      class="px-4 py-2 rounded-lg text-sm transition-colors"
      :class="getLinkClass('/profile/edit')"
    >
      Perfil
    </router-link>
    <router-link
      to="/account/edit"
      class="px-4 py-2 rounded-lg text-sm transition-colors"
      :class="getLinkClass('/account/edit')"
    >
      Conta
    </router-link>
  </aside>
</template>