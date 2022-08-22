<template>
  <header class="bg-at-light-green text-white ">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-6">
        <img class="w-16" src="@/assets/tasks.png" alt="task icon">
        <h1 class="text-lg">TaskApp</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ path: '/auth/login' }">LogIn</router-link>
        <router-link class="cursor-pointer" :to="{ path: '/auth/sign-up' }">SignUp</router-link>
        <li @click="logout" class="cursor-pointer">LogOut</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import {supabase} from "../supabase";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const userStore = useUserStore();
const isLogged = "";

onMounted(async () => {
  const user = null;
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      user = true
      this.isLogged = user
    } else {
      user = false
      this.isLogged = user
    }
  } catch (e) {
  }
  console.log(isLogged)
});


//Ref to router
const router = useRouter()

//Logout
const logout = async () => {
  await supabase.auth.signOut();
  router.push({path: "/auth/login"})
}


//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style></style>
