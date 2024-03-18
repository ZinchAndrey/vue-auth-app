<template>
  <main>
    <router-view/>
  </main>
</template>

<script>

export default {

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
