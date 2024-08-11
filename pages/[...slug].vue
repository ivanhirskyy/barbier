<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="container py-8 text-center text-3xl font-semibold">
    Página <span class="text-primary-600">{{ route.fullPath }}</span> não
    encontrada.
  </div>
</template>
