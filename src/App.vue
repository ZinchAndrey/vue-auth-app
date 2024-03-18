<template>
  <main>
    <sign-up></sign-up>
  </main>
</template>

<script>
// import { RouterLink, RouterView } from 'vue-router'
import SignUp from '@/components/SignUp.vue';

export default {
  components: {
    SignUp,
  }
}
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--container-bg-color);

  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
