<template>
  <header class="bg-stone-900 p-6 top-0 w-full fixed z-10">
    <div class="flex justify-between items-center max-w-7xl mx-auto">
      <div class="flex items-center gap-2 text-white font-medium"> 
        <figure>
          <img 
            :src="logobranca" 
            alt="Logo PromptMAP" 
            class="w-10 h-12"
          />
        </figure>
        <div class="font-bold text-1xl ">
          PromptMAP
        </div>
      </div>

      <nav class="flex items-center gap-8 ">
        <a href="#Home" class="text-neutral-400 hover:text-neutral-500">Home</a>
        <a href="#Sobre" class="text-neutral-400 hover:text-neutral-500">Sobre</a>
        <a href="#HowWorks" class="text-neutral-400  hover:text-neutral-500">Como Funciona</a>
        <a href="#Contato" class="text-neutral-400 hover:text-neutral-500">Contato</a>
      </nav>

      <div class="flex items-center gap-4">
        <button  @click="showLogin = true" class="bg-neutral-400 text-white px-6 py-2 rounded-lg hover:bg-neutral-500">Login</button>
        <button  @click="showRegister= true"  class="bg-white text-neutral-400 px-6 py-2 rounded-lg hover:bg-gray-100">
          Register
        </button>
      </div>
    </div>
  </header>

    <section id="Home" class="bg-gradient-to-b from-neutral-900 to-neutral-400 min-h-screen flex justify-center items-start pt-49">
      <div class="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-12">
          <div class="md:w-1/2">
            <h2 class="text-3xl md:text-5xl font-light text-white mb-6 pb-6">
              Explore ideias e <br/>compartilhe as suas!
            </h2>
            <div>
              <button 
                @click="showLogin = true" 
                class="bg-neutral-400 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                Comece agora
              </button>
              <button class="hover:scale-105 transition-transform duration-300">
                <a href="#Sobre" class="ml-4 bg-white text-neutral-400 px-6 py-3 rounded-lg hover:bg-gray-100">
                  Saiba mais
                </a>
              </button>
            </div>
          </div>

          <div class="md:w-1/2">
              <img
                :src="heroimage"
                alt="Imagem de destaque"
              />
          </div>
        </div>
    </section>

  <section id="Sobre" class="bg-neutral-100 min-h-screen flex justify-center items-center px-6">
    <div class="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-12">
      <div class="md:w-1/2">
        <img
          :src="heroimage"
          alt="Imagem de destaque"
        />
      </div>

      <div class="md:w-1/2">
        <h2 class="text-3xl md:text-5xl font-bold text-neutral-800 mb-6">
          Sobre o PromptMAP
        </h2>
        <p class="text-neutral-600 text-lg leading-relaxed">
          O PromptMAP é uma plataforma inovadora que permite aos usuários explorar, compartilhar e descobrir ideias criativas. Nossa missão é conectar pessoas através de suas inspirações e promover a troca de conhecimentos em um ambiente colaborativo.
        </p>
      </div>
    </div>
  </section>

  <section id="HowWorks" class="bg-neutral-100  flex justify-center items-start pt-28 px-6 pb-40">
  <div class="max-w-7xl w-full flex flex-col justify-center items-center gap-12">
    <div class="text-center w-full md:w-auto max-w-2xl">
      <h2 class="text-3xl md:text-5xl font-bold text-neutral-800 mb-6">
        Como Funciona
      </h2>
      <p class="text-neutral-600 text-lg leading-relaxed">
        O PromptMAP é uma rede social onde você pode salvar e compartilhar prompts de IA. 
      </p>
    </div>

    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl p-6">
      <div class="bg-white rounded-lg shadow-md p-10 text-center hover:scale-105 transition-transform duration-300">
          <div class="mx-auto mb-4 w-12 h-12 flex items-center justify-center">
            <User class="w-20 h-20 text-neutral-500" />
          </div>
          <h3 class="text-sm font-light text-neutral-800">
            Crie uma conta e explore prompts populares
          </h3>
        </div>

      <div class="bg-white rounded-lg shadow-md p-10 text-center hover:scale-105 transition-transform duration-300">
        <div class="mx-auto mb-4 w-12 h-12 flex items-center justify-center h">
            <Heart class="w-20 h-20 text-neutral-500" />
          </div>
        <h3 class="text-sm font-light text-neutral-800 mb-4">
          Salve seus favoritos 
        </h3>
      </div>

      <div class="bg-white rounded-lg shadow-md p-10 text-center hover:scale-105 transition-transform duration-300">
        <div class="mx-auto mb-4 w-12 h-12 flex items-center justify-center">
            <Send class="w-20 h-20 text-neutral-500" />
          </div>
        <h3 class="text-sm font-light text-neutral-800 mb-4">
          Compartilhe suas próprias ideias com a comunidade
        </h3>
      </div>
    </div>
  </div>
</section>

  <footer id="Contato" class="bg-stone-950 text-neutral-400 font-light py-12 px-8">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
    
    <div>
      <h2 class="text-xl text-white font-medium mb-2">PromptMAP</h2>
      <p>Desenvolvido por Caio Tarso</p>
    </div>

    <div>
      <h3 class="text-white mb-3">Entre em contato comigo:</h3>
      <div class="flex items-center gap-4">
        <a 
          href="https://www.linkedin.com/in/caiotarso/" 
          target="_blank" 
          class="hover:text-neutral-500 transition-colors">
          <Linkedin />
        </a>
        <a 
          href="https://github.com/caiotarso" 
          target="_blank" 
          class="hover:text-neutral-500 transition-colors">
          <Github />
        </a>
      </div>
    </div>

  </div>
  <div class="border-t border-neutral-800 mt-8 pt-6 flex justify-center items-centermd:text-right">
    <p class="text-sm">&copy; 2024 PromptMAP. Todos os direitos reservados.</p>
  </div>
</footer>

<LoginModal
    v-if="showLogin"
    @close="showLogin = false"
    @open-register="openRegister"
  />

  <RegisterModal
    v-if="showRegister"
    @close="showRegister = false"
    @open-login="openLogin"
  />
</template>

<script setup>
import { ref } from "vue";
import heroimage from "../assets/heroimage.png";
import logobranca from "../assets/logobranca.png";
import { User, Heart, Send, Linkedin, Github, Terminal } from "lucide-vue-next";
import LoginModal from "../components/modals/auth/LoginModal.vue";
import RegisterModal from "../components/modals/auth/RegisterModal.vue";

const showLogin = ref(false);
const showRegister = ref(false);

const openLogin = () => {
    showRegister.value = false;
    showLogin.value = true;
};

const openRegister = () => {
    showLogin.value = false;
    showRegister.value = true;
};

</script>
