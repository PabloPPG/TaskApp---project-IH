<script setup>
import Nav from "./components/Nav.vue"
import Footer from "./components/Footer.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { ref } from "vue";
 
const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

components:{
  Nav,
  Footer
}

onMounted(async () => {
  const appReady = ref(null);
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      appReady.value = true;
      router.push({ path: "/auth" });
    } else {
      // continue to dashboard
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
}); 
</script>

<template>
  <div class="min-h-full font-Poppins box-border">
    <router-view />
  </div>
</template>

<style></style>
