<template>
  <header class="bg-at-light-green text-white ">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-6">
        <img class="w-16" src="@/assets/tasks.png" alt="task icon">
        <h1 class="text-lg">TaskApp</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link class="cursor-pointer" :to="{ path: '/auth/sign-up' }">SignUp</router-link>
      </ul>
    </nav>
  </header>
</template>

<script setup>
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style></style>
