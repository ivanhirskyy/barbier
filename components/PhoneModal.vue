<script setup lang="ts">
const modalId = 'PhoneModal';

const { removeModal } = useModals();
</script>
<template>
  <MyModal :id="modalId" title="Adicionar número de telemóvel">
    <SetPhoneForm class="min-w-[300px]" @on-submit="removeModal(modalId)" />
  </MyModal>
</template>
