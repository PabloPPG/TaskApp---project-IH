<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- error handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>    
    </div>
    <!-- login -->
    <form @submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">

      <h1 class="text-3xl text-at-light-green mb-4">Sign In</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input type="text" required placeholder="emailname@email.com" class="p-2 text-gray-500 focus:outline-none" id="email" v-model="email">
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
        <input type="password" required placeholder="******" class="p-2 text-gray-500 focus:outline-none" id="password" v-model="password">
      </div>

      <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-300 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green">Login</button>

      <router-link class="text-sm mt-6 text-center" :to="{ path: '/auth/sign-up' }">Don't have an acount? <span class="text-at-light-green">Register</span></router-link>

    </form>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Test the Sign Up Route";

// Input Fields
const email = ref(null);
const password = ref(null);
const router = useRouter();

// Error Message
const errorMsg = ref(null);

//Show hide password variables
// const passwordFieldType = computed(() =>
//   hidePassword.value ? "password" : "text"
// );
// const hidePassword = ref(true);


// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase

// const login = async () => {
//   try{
//     const {error} = await supabase.auth.signIn({
//       email: email.value,
//       password: password.value,
//     })
//     if (error) throw error;
//     router.push({ path: "/"});
    
//   } catch(error) {
//     errorMsg.value = `Error: ${error.message}`;
//     setTimeout(()=>{errorMsg.value = null},5000);
//   }
// },

// const login = async () => {
//   try{
//     await supabase.auth.signIn(email.value, password.value);
//     router.push({path: "/"})
//   }
//   catch(error){
//     errorMsg.value = `${error.message}`;
//     setTimeout(()=>{errorMsg.value = null},5000);
//   }
// }
const login = async () => {
  try{
    await useUserStore().signIn(email.value, password.value);
    router.push({path: "/"})
  }
  catch(error){
    errorMsg.value = `${error.message}`;
    setTimeout(()=>{errorMsg.value = null},5000);
  }
}



</script>

<style>
.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
