<script lang="ts" setup>
const { logout } = useStrapiAuth();

const onLogout = () => {
  logout();
  navigateTo('/login');
};
</script>
<template>
  <div class="layout">
    <NavBar />
    <slot></slot>
  </div>
</template>
