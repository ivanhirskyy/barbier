<script setup lang="ts">
const modal = useModal();

const activeTab = ref('login');
</script>
<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ activeTab === 'login' ? 'Entrar' : 'Criar conta' }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="modal.close()"
          />
        </div>
      </template>

      <LoginForm v-if="activeTab === 'login'" />
      <RegisterForm v-else />
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
    </UCard>
  </UModal>
</template>
