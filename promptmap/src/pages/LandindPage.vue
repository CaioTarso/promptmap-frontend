<template>
  <header class="bg-stone-900 p-6">
    <div class="flex justify-between items-center max-w-7xl mx-auto">
      <!-- Logo -->
      <div class="font-bold text-2xl text-neutral-400">
        PromptMAP
      </div>

      <nav class="flex items-center gap-8 ">
        <a href="#" class="text-neutral-400">Home</a>
        <a href="#" class="text-neutral-400">Sobre</a>
        <a href="#" class="text-neutral-400">Contato</a>
      </nav>

      <div class="flex items-center gap-4">
        <button class="bg-neutral-400 text-white px-6 py-2 rounded-lg hover:bg-neutral-500">Login</button>
        <button class="bg-white text-neutral-400 px-6 py-2 rounded-lg hover:bg-gray-100">
          Register
        </button>
      </div>
    </div>
  </header>

  <section id="Home" class="bg-linear-to-b from-neutral-900 to-neutral-400 to-94% p-100" >
     <div class="flex ">
        <div class="flex justify-center items-center">
         <img 
            :src="heroimage" 
            alt="heroimage" 
         />
        </div>
       <h2>Explore ideias e compartilhe as suas</h2>
     </div>
  </section>
</template>

<script setup>
  import heroimage from '../assets/heroimage.png';
</script>