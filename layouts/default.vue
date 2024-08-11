<script setup lang="ts">
import UserAuth from '~/components/UserAuth.vue';

const modal = useModal();

function openModalAuth() {
  modal.open(UserAuth);
}

openModalAuth();
</script>

<template>
  <div class="layout">
    <NavBar />
    <slot></slot>
  </div>
</template>
