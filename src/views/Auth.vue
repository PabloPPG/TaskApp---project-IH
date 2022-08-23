<template>
  <Nav />
  <Footer />
  <router-view></router-view>
</template>

<script setup>
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';

components: {
  Nav,
  Footer
}
</script>

<style></style>

<!-- 
**noHints**
-->
