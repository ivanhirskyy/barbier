<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook('page:start', () => {
  loading.value = true;
});
nuxtApp.hook('page:finish', () => {
  loading.value = false;
});
</script>

<template>
  <Transition>
    <div
      v-show="loading"
      class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white opacity-80 dark:bg-gray-800"
    >
      <BarberPole />
    </div>
  </Transition>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
