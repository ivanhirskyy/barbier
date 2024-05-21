<script setup lang="ts">
import MyModal from '~/components/MyModal.vue';

const toast = useToast();

const modal = useModal();
const count = ref(0);

function openModal() {
  count.value += 1;
  modal.open(MyModal, {
    onSuccess() {
      toast.add({
        title: 'Success !',
        id: 'modal-success',
      });
    },
  });
}
</script>

<template>
  <div class="login-page relative">
    <div class="w-full h-svh bg-secondary-800">
      <NuxtImg
        src="./login-banner.webp"
        alt="Logo"
        width="100%"
        class="w-full cover filter blur-sm brightness-75"
      />
    </div>
    <div class="absolute top-0 w-full">
      <UContainer class="w-full py-4">
        <p class="hidden" @click="openModal">open modal</p>
        <LoginForm />
        <RegisterForm />
      </UContainer>
    </div>
  </div>
</template>
