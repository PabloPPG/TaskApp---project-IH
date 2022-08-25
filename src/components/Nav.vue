<template>
  <header class="bg-at-light-green text-white ">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-6">
        <img class="w-16" src="@/assets/tasks.png" alt="task icon">
        <h1 class="text-lg">TaskApp</h1>
      </div>
      <ul v-if="!user" class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ path: '/auth' }">Log In</router-link>
        <router-link class="cursor-pointer" :to="{ path: '/auth/sign-up' }">Sign Up</router-link>
      </ul>
      <ul v-if="user" class="flex flex-1 justify-end gap-x-10">
        <li @click="logOut" class="cursor-pointer">Log Out</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import {useUserStore} from "../stores/user"
import {supabase} from "../supabase";
import { useRouter } from "vue-router";
import { computed } from "vue";

//constant to save a variable that will hold the use router method
const router = useRouter()
// constant to save a variable that will get the user from store with a computed function imported from vue
const user = computed(() => useUserStore().user);

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const logOut = async () => {
  await supabase.auth.signOut();
  useUserStore().user = null;
  router.push({path: "/auth"})
}

</script>

<style></style>
