<script setup lang="ts">
import UserAuth from '~/components/AuthModal.vue';
import MyModal from '~/components/MyModal.vue';

/* const modal = useModal();

function openModalAuth() {
  modal.open(UserAuth);
}

openModalAuth(); */

const { addModal } = useModals();

addModal('BookingModal');
addModal('AuthModal');
addModal('PhoneModal');
</script>

<template>
  <div class="layout">
    <NavBar />
    <slot></slot>
    <MyModals />
    <!-- <AuthModal /> -->
  </div>
</template>
