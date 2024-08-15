<script setup lang="ts">
const activeTab = ref('login');
const modalId = 'AuthModal';

const { closeModal } = useModals();
</script>
<template>
  <MyModal
    :id="modalId"
    :title="activeTab === 'login' ? 'Entrar' : 'Criar conta'"
  >
    <LoginForm
      v-if="activeTab === 'login'"
      class="min-w-[300px]"
      @on-submit="closeModal(modalId)"
    />
    <RegisterForm
      v-else
      class="min-w-[300px]"
      @on-submit="closeModal(modalId)"
    />
    <template #footer>
      <p v-if="activeTab === 'login'" class="flex justify-center gap-2">
        Não possui uma conta ?
        <MyButton variant="link" size="sm" @click="activeTab = 'register'"
          >Registar</MyButton
        >
      </p>
      <p v-else class="flex justify-center gap-2">
        Já possui uma conta ?
        <MyButton variant="link" size="sm" @click="activeTab = 'login'"
          >Login</MyButton
        >
      </p>
    </template>
  </MyModal>
</template>
