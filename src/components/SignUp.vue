<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- error handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>    
    </div>
    <!-- register -->
    <form @submit.prevent="register" action="" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">

      <h1 class="text-3xl text-at-light-green mb-4">Register</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input type="text" required placeholder="emailname@email.com" class="p-2 text-gray-500 focus:outline-none" id="email" v-model="email">
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
        <input type="password" required placeholder="******" class="p-2 text-gray-500 focus:outline-none" id="password" v-model="password">
      </div>

      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="mb-1 text-sm text-at-light-green">Confirm Password</label>
        <input type="password" required placeholder="******" class="p-2 text-gray-500 focus:outline-none" id="confirmPassword" v-model="confirmPassword">
      </div>

      <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-300 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">Register
      </button>

      <router-link class="text-sm mt-6 text-center" :to="{ path: '/auth' }">Already have an acount? <span class="text-at-light-green">Login</span></router-link>

    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";


// Route Variables
const route = "/auth";
const buttonText = "Test the Sign In Route";
//Habilita libreria de vue router y da acceso a useRouter() para redireccionar
const router = useRouter();


// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

// Error Message
const errorMsg = ref(null);

const register = async () => {
  if(password.value === confirmPassword.value){
    try{
      await useUserStore().signUp(email.value, password.value)
      router.push({path: "/auth"})
    }
    catch(error){
      errorMsg.value = error.message;
      setTimeout(()=>{errorMsg.value = null},5000);
    }
    return
  }
  errorMsg.value = "Las contraseñas no son iguales"
  setTimeout(()=>{errorMsg.value = null},5000);
}

// Show hide confrimPassword variable


</script>

<style></style>
