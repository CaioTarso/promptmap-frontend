<template>
  <div class="fixed inset-0 z-50" @click.self="$emit('close')">
    
    <div class="absolute top-0 right-0 mt-40  pr-78">
    
      <div class="relative w-full w-md bg-[#D9D9D9] text-gray-900 rounded-lg shadow-2xl p-8">
        
        <h2 class="text-2xl font-normal text-center mb-6">
          Cadastre-se
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-8">

         <div>
            <label class="text-sm font-medium block">Nome Completo</label>
            <input
                v-model="name"
                type="text"
                required
                placeholder="Digite seu nome completo"
                
                class="w-full mt-1 px-3 py-4 border border-black rounded-md focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />            
         </div>


          <div>
            <label class="text-sm font-medium block">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="Digite seu email"
              
              class="w-full mt-1 px-3 py-4 border border-black rounded-md focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label class="text-sm font-medium block">Senha</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="Digite sua senha"
              
              class="w-full mt-1 px-3 py-4 border border-black rounded-md focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>


          <button
            type="submit"
            class="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Entrar
            
          </button>


        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Login com:", email.value, password.value);
};
</script>