<script setup lang="ts">
/* const strapi_jwt = useRuntimeConfig().public.STRAPI_JWT;

const strapi_jwt_cookie = useCookie('strapi_jwt');

if (!strapi_jwt_cookie.value) {
  strapi_jwt_cookie.value = strapi_jwt;
} */
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
  <UModals />
</template>
