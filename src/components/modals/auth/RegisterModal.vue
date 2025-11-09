<template>
  <div class="fixed inset-0  bg-black/40 z-50" @click.self="$emit('close')">
    
    <div class="absolute top-0 right-0 mt-40  pr-78">
    
      <div class="relative w-full w-md bg-[#D9D9D9] text-gray-900 rounded-2xl shadow-2xl p-8">
        <div>
            <figure>
                <img 
                    :src="logo" 
                    alt="Logo PromptMAP" 
                    class="w-10 h-13 mx-auto mb-4"
                />
            </figure>
        </div>

        <button 
          @click="$emit('close')" 
          class="absolute top-3 right-3 text-gray-700 hover:text-black hover:bg-zinc-400 rounded-sm cursor-pointer transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
        
        <h2 class="text-1xl font-bold text-center mb-6">
          Bem vindo(a) ao PromptMAP
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-6">

         <div>
            <label class="text-xs font-medium block">Nome Completo</label>
            <input
                v-model="name"
                type="text"
                required
                placeholder="Digite seu nome completo"
                
                class="w-full mt-1 px-3 py-4 border text-xs border-black rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />            
         </div>


          <div>
            <label class="text-xs font-medium block">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="Digite seu email"
              
              class="w-full mt-1 px-3 py-4 text-xs border border-black rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <label class="text-xs font-medium block">Senha</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="Digite sua senha"
              
              class="w-full mt-1 px-3 py-4 border text-xs border-black rounded-2xl focus:border-black focus:ring-1 focus:ring-black outline-none placeholder-gray-500"
            />
          </div>


          <button
            type="submit"
            class="w-full bg-black text-xs text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Entrar
            
          </button>

          <div class="text-xs text-center pt-2">
            Já possui uma conta? 
            <a href="#" @click.prevent="$emit('open-login')" class="font-bold hover:underline text-black">
              Entre agora.
            </a>
          </div>


        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { X } from "lucide-vue-next";
import logo from "../../../assets/logo.png";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Login com:", email.value, password.value);
};
</script>